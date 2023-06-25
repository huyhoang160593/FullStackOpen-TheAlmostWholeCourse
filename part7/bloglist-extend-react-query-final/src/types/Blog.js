/**
 * @typedef {Object} Blog
 * @property {string} id
 * @property {string} title
 * @property {string} author
 * @property {string} url
 * @property {number} likes
 * @property {Omit<User, 'blogs'>} [user]
 * @property {BlogComment[]} comment
 */