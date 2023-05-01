const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
];

const initialUser = {
  username: 'the99spuppycat',
  password: '16051993',
  name: 'The99sPuppycat',
};

const newBlogObject = {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
};

const dataToUpdate = {
  title: 'This is the update title',
  author: "The 99's Puppycat",
  url: 'https://github.com/huyhoang160593',
  likes: 5,
};

const nonExistBlogs = async () => {
  const blogToBeDelete = new Blog(newBlogObject);
  await blogToBeDelete.save();
  await blogToBeDelete.deleteOne();
  return blogToBeDelete._id.toString();
};

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const generateNewUserToken = async () => {
  const user = new User({
    username: initialUser.username,
    name: initialUser.name,
    passwordHash: 'thisthingiscompletelyuseless',
  });
  await user.save();
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET);

  return {
    token,
    username: user.username,
    name: user.name,
  };
};

const clearUserSchema = async () => {
  await User.deleteMany();
};

module.exports = {
  initialBlogs,
  newBlogObject,
  dataToUpdate,
  nonExistBlogs,
  blogsInDB,
  usersInDb,
  generateNewUserToken,
  clearUserSchema,
};
