/**
 * @typedef {Object} BaseBlog
 * @property {string} id
 * @property {string} title
 * @property {string} author
 * @property {string} url
 * @property {number} likes
 * @property {BlogComment[]} comment
 */

/**
 * @typedef {BaseBlog & {user: Omit<User, 'blogs'>}} Blog
 */

/**
 * @typedef {BaseBlog & {user: string}} RawBlog
 */