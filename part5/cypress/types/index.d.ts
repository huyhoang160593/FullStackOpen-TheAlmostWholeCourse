declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(loginObject: { username: string; password: string }): Chainable<any>;
    createBlog(blogObject: {title: string, author: string, url: string}): Chainable<any>
  }
}
