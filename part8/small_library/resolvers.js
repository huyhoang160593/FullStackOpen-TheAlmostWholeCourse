const { GraphQLError } = require("graphql");
const { PubSub } = require('graphql-subscriptions')
const { SECRET_PASSWORD, JWT_SECRET } = require("./utilities/config");
const jwt = require('jsonwebtoken');
const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require("./models/User");
const { BOOK_ADDED } = require("./utilities/subscriptionKeys");

const pubSub = new PubSub()

const resolvers = /** @type {import("@graphql-tools/utils").IResolvers} */({
  Query: {
    bookCount: async () => Book.countDocuments({}),
    authorCount: async () => Author.countDocuments({}),
    // TODO: fix this
    /**
     * @param {*} _root
     * @param {{author: string?, genre: string?}} args
     * @param {{ currentUser?: User }} context
     */
    allBooks: async (_root, { author, genre }, context) => {
      if (author) {
        const existAuthor = await Author.findOne({ name: author });
        if (!existAuthor) return [];
        return Book.find({
          author: existAuthor._id,
          ...(genre && { genres: genre }),
        }).populate('author', { name: 1, born: 1 });
      }
      return Book.find({
        ...(genre && { genres: genre }),
      }).populate('author', { name: 1, born: 1 });
    },
    allAuthors: async () => {
      const result = await Author.find({}).populate('books', { title: true })
      return result
    },
    me: (_root, _args, context) => context.currentUser,
  },
  Author: {
    bookCount: (root) => root.books.length,
  },
  Mutation: {
    /**
     * @param {{
     *  title:     string,
     *  author:    string,
     *  published: number
     *  genres:    string[]
     * }} args
     * @param {{ currentUser?: User }} context
     * */
    addBook: async (_root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      let existAuthor = await Author.findOne({
        name: args.author,
      });
      if (!existAuthor) {
        existAuthor = new Author({ name: args.author });
        try {
          await existAuthor.save();
        } catch (error) {
          throw new GraphQLError('Create non-exist Author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error,
            },
          });
        }
      }
      const book = new Book({ ...args, author: existAuthor });
      try {
        await book.save();
        await existAuthor.updateOne({
          $push: {
            books: book
          }
        })
      } catch (error) {
        throw new GraphQLError('Create Book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }

      pubSub.publish(BOOK_ADDED, { bookAdded: book })
      return book;
    },
    /**
     * @param {{
     *  name: string,
     *  setBornTo: number
     * }} args
     * @param {{ currentUser?: User }} context
     * */
    editAuthor: async (_root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      return Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true, runValidators: true, context: 'query' }
      );
    },
    /**
     *
     * @param {*} _root
     * @param {{ username: string, favoriteGenre: string }} args
     */
    createUser: async (_root, args) => {
      const user = new User(args);
      return user.save().catch((error) => {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      });
    },
    /**
     *
     * @param {*} _root
     * @param {{ username: string, password: string }} args
     */
    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== SECRET_PASSWORD) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(BOOK_ADDED)
    },
  },
});

module.exports = resolvers