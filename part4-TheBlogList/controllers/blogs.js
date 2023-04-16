const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const {
    title, author, url, likes,
  } = request.body;
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
  });

  const blogSaved = await blog.save();
  response.status(201).json(blogSaved);
});

blogsRouter.delete('/:id', async (request, response) => {
  const toBeDeletedBlogID = request.params.id;
  await Blog.findByIdAndRemove(toBeDeletedBlogID);
  response.status(204).end();
});

module.exports = blogsRouter;
