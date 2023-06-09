const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const {
    title, author, url, likes,
  } = request.body;
  const user = request.user;
  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
    user: user._id,
  });
  const blogSaved = await blog.save();

  user.blogs = user.blogs.concat(blogSaved._id);
  await user.save();

  return response.status(201).json(blogSaved);
});

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user;
  const toBeDeletedBlogID = request.params.id;
  const blog = await Blog.findById(toBeDeletedBlogID);
  if (blog.user.toString() === user._id.toString()) {
    await blog.deleteOne();
  }
  return response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const validKeys = ['title', 'author', 'url', 'likes'];
  const updateData = Object.entries(request.body).reduce(
    (updateObject, entry) => {
      if (!validKeys.includes(entry[0])) return updateObject;
      updateObject[entry[0]] = entry[1];
      return updateObject;
    },
    {},
  );
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    updateData,
    { new: true, runValidators: true, context: 'query' },
  );
  response.json(updatedBlog);
});

blogsRouter.post('/:id/comment', async (request, response) => {
  const user = request.user;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      $push: {
        comment: {
          userId: user._id,
          content: request.body.content,
        },
      },
    },
    { new: true, runValidators: true, context: 'query' },
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
