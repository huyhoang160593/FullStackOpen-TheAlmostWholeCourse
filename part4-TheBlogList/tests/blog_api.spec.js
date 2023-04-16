const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany();
  const blogsObject = helper.initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogsObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('all blogs are return', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('new blog have unique identifier property name id', () => {
  const newBlogObject = new Blog(helper.newBlogObject);
  expect(newBlogObject.id).toBeDefined();
});

test('post new blog successful', async () => {
  await api
    .post('/api/blogs')
    .send(helper.newBlogObject)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const blogInDB = await helper.blogsInDB();
  expect(blogInDB.length).toEqual(helper.initialBlogs.length + 1);
});

afterAll(async () => {
  await mongoose.connection.close();
});
