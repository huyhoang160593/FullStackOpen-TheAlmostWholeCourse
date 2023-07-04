const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const {
  PORT,
  MONGODB_URI,
  SECRET_PASSWORD,
  JWT_SECRET,
} = require('./utilities/config');
const { default: mongoose, Mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const Book = require('./models/Book');
const Author = require('./models/Author');
const { GraphQLError } = require('graphql');
const User = require('./models/User');
mongoose.set('strictQuery', false);

/*
  you can remove the placeholder query once your first own has been implemented
*/

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB', error.message);
  });

const typeDefs = `#graphql
  type User {
    username:      String!
    favoriteGenre: String!
    id:            ID!
  }
  type Token {
    value: String!
  }
  type Book {
    title:     String!
    published: Int!
    author:    Author!
    id:        ID!
    genres:    [String!]!
  }
  type Author {
    id:        String!
    name:      String!
    born:      String
    bookCount: Int
  }
  type Query {
    bookCount:                               Int
    authorCount:                             Int
    allBooks(author: String, genre: String): [Book!]!
    allAuthors:                              [Author!]!
    me:                                      User
  }
  type Mutation {
    addBook(
      title:     String!
      author:    String!
      published: Int!
      genres:    [String!]
    ): Book
    editAuthor(
      name:      String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

/**
 * @typedef {object} User
 * @property {string} username
 * @property {string} favoriteGenre
 * @property {import('mongoose').ObjectId} id
 */

const resolvers = {
  Query: {
    bookCount: async () => Book.countDocuments({}),
    authorCount: async () => Author.countDocuments({}),
    // TODO: fix this
    /**
     * @param {*} _root
     * @param {{author: string?, genre: string?}} args
     */
    allBooks: async (_root, { author, genre }) => {
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
    allAuthors: async () => Author.find({}),
    me: (_root, _args, context) => context.currentUser,
  },
  Author: {
    bookCount: (root) => 0,
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
      } catch (error) {
        throw new GraphQLError('Create Book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }
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
     * @param {*} root
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
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req, res:_res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      const decodeToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodeToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
