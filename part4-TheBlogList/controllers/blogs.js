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

blogsRouter.put('/:id', async (request, response) => {
  const validKeys = ['title', 'author', 'url', 'likes'];
  const updateData = Object.entries(request.body).reduce((updateObject, entry) => {
    if (!validKeys.includes(entry[0])) return updateObject;
    updateObject[entry[0]] = entry[1];
    return updateObject;
  }, {});
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updateData,
    { new: true, runValidators: true, context: 'query' },
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
