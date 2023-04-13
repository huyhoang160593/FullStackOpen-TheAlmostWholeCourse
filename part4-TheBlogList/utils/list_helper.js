const dummy = (_blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sumLikes, blog) => sumLikes + blog.likes, 0);

module.exports = {
  dummy,
  totalLikes,
};
