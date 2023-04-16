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

  describe('update data of an individual blog', () => {
    test('successfully with most of the data is changing', async () => {
      const blogAtStart = await helper.blogsInDB();
      const blogIDToBeUpdated = blogAtStart[0].id;

      await api.put(`/api/blogs/${blogIDToBeUpdated}`).send(helper.dataToUpdate).expect(200);

      const blogsAtEnd = await helper.blogsInDB();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      const {
        title, author, url, likes,
      } = blogsAtEnd.find((blog) => blog.id === blogIDToBeUpdated);
      const dataAfter = {
        title, author, url, likes,
      };
      expect(dataAfter).toMatchObject(helper.dataToUpdate);
    });

    test('not create new property even when you pass them though body', async () => {
      const blogAtStart = await helper.blogsInDB();
      const blogIDToBeUpdated = blogAtStart[0].id;
      const dataWithUnwantedPros = {
        ...helper.dataToUpdate,
        yikes: 'This property shouldn\'t exist',
      };

      await api.put(`/api/blogs/${blogIDToBeUpdated}`).send(dataWithUnwantedPros).expect(200);

      const blogsAtEnd = await helper.blogsInDB();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      const {
        title, author, url, likes, yikes,
      } = blogsAtEnd.find((blog) => blog.id === blogIDToBeUpdated);
      const dataAfter = {
        title, author, url, likes,
      };
      expect(dataAfter).toMatchObject(helper.dataToUpdate);
      expect(yikes).toEqual(undefined);
    });

    test('successfully update only title', async () => {
      const blogAtStart = await helper.blogsInDB();
      const blogToBeUpdated = blogAtStart[0];
      const updatedTitle = {
        title: helper.dataToUpdate.title,
      };

      await api.put(`/api/blogs/${blogToBeUpdated.id}`).send(updatedTitle).expect(200);

      const blogsAtEnd = await helper.blogsInDB();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      const {
        id, title, author, url, likes,
      } = blogsAtEnd.find((blog) => blog.id === blogToBeUpdated.id);
      const dataAfter = {
        id, title, author, url, likes,
      };
      expect(dataAfter).toMatchObject({
        ...blogToBeUpdated,
        ...updatedTitle,
      });
    });

    test('successfully update only author', async () => {
      const blogAtStart = await helper.blogsInDB();
      const blogToBeUpdated = blogAtStart[0];
      const updatedAuthor = {
        author: 'Hien Minh Sinh',
      };

      await api.put(`/api/blogs/${blogToBeUpdated.id}`).send(updatedAuthor).expect(200);

      const blogsAtEnd = await helper.blogsInDB();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      const {
        id, title, author, url, likes,
      } = blogsAtEnd.find((blog) => blog.id === blogToBeUpdated.id);
      const dataAfter = {
        id, title, author, url, likes,
      };
      expect(dataAfter).toMatchObject({
        ...blogToBeUpdated,
        ...updatedAuthor,
      });
    });

    test('successfully update only likes', async () => {
      const blogAtStart = await helper.blogsInDB();
      const blogToBeUpdated = blogAtStart[0];
      const updatedLikes = {
        likes: 20,
      };

      await api.put(`/api/blogs/${blogToBeUpdated.id}`).send(updatedLikes).expect(200);

      const blogsAtEnd = await helper.blogsInDB();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      const {
        id, title, author, url, likes,
      } = blogsAtEnd.find((blog) => blog.id === blogToBeUpdated.id);
      const dataAfter = {
        id, title, author, url, likes,
      };
      expect(dataAfter).toMatchObject({
        ...blogToBeUpdated,
        ...updatedLikes,
      });
    });

    test('return status code 400 if pass invalid title property', async () => {
      const blogAtStart = await helper.blogsInDB();
      const blogToBeUpdated = blogAtStart[0];
      const invalidUpdateData = {
        title: null,
      };

      await api.put(`/api/blogs/${blogToBeUpdated.id}`).send(invalidUpdateData).expect(400);
      const blogsAtEnd = await helper.blogsInDB();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      const {
        id, title, author, url, likes,
      } = blogsAtEnd.find((blog) => blog.id === blogToBeUpdated.id);
      const dataAfter = {
        id, title, author, url, likes,
      };
      expect(dataAfter).toMatchObject(blogToBeUpdated);
    });
    test('return status code 400 if pass invalid url property', async () => {
      const blogAtStart = await helper.blogsInDB();
      const blogToBeUpdated = blogAtStart[0];
      const invalidUpdateData = {
        url: null,
      };

      await api.put(`/api/blogs/${blogToBeUpdated.id}`).send(invalidUpdateData).expect(400);
      const blogsAtEnd = await helper.blogsInDB();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
      const {
        id, title, author, url, likes,
      } = blogsAtEnd.find((blog) => blog.id === blogToBeUpdated.id);
      const dataAfter = {
        id, title, author, url, likes,
      };
      expect(dataAfter).toMatchObject(blogToBeUpdated);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
