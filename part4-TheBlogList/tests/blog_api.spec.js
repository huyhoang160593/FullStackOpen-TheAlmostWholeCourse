const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany();
  await Blog.insertMany(helper.initialBlogs);
});

describe('when there is some blogs save', () => {
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
});

describe('adding new blog', () => {
  test('successfully with valid data', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlogObject)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const blogAtEnd = await helper.blogsInDB();
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const blogs = blogAtEnd.map(({
      title, url, author, likes,
    }) => ({
      title,
      url,
      author,
      likes,
    }));
    expect(blogs).toContainEqual(helper.newBlogObject);
  });

  test('without likes property, default to be 0 and still successful', async () => {
    const newBlogObjectWithoutLike = {
      ...helper.newBlogObject,
    };
    delete newBlogObjectWithoutLike.likes;
    const result = await api
      .post('/api/blogs')
      .send(newBlogObjectWithoutLike)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(result.body.likes).toEqual(0);
    const blogAtEnd = await helper.blogsInDB();
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    const blogs = blogAtEnd.map(({
      title, url, author, likes,
    }) => ({
      title,
      url,
      author,
      likes,
    }));
    expect(blogs).toContainEqual({ ...helper.newBlogObject, likes: 0 });
  });

  test('missing title will return Bad Request 400', async () => {
    const newBlogObjectWithoutTitle = {
      ...helper.newBlogObject,
    };
    delete newBlogObjectWithoutTitle.title;
    await api.post('/api/blogs').send(newBlogObjectWithoutTitle).expect(400);
    const blogAtEnd = await helper.blogsInDB();
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('missing url will also return Bad Request 400', async () => {
    const newBlogObjectWithoutURL = {
      ...helper.newBlogObject,
    };
    delete newBlogObjectWithoutURL.url;
    await api.post('/api/blogs').send(newBlogObjectWithoutURL).expect(400);
    const blogAtEnd = await helper.blogsInDB();
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('and finally missing both title and url will also return Bad Request 400', async () => {
    const newBlogObjectWithoutTitleAndURL = {
      ...helper.newBlogObject,
    };
    delete newBlogObjectWithoutTitleAndURL.url;
    delete newBlogObjectWithoutTitleAndURL.title;
    await api
      .post('/api/blogs')
      .send(newBlogObjectWithoutTitleAndURL)
      .expect(400);
    const blogAtEnd = await helper.blogsInDB();
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deletion of a blog', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const blogAtStart = await helper.blogsInDB();
    const blogToDelete = blogAtStart[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogAtEnd = await helper.blogsInDB();
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
