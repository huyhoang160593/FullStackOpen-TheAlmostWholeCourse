const dummy = (_blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sumLikes, blog) => sumLikes + blog.likes, 0);

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null;
  const mostLikeValue = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === mostLikeValue);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
