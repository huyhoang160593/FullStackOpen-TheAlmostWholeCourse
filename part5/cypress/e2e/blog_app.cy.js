describe('Blog app', function () {
  const mainTestUser = {
    name: 'The 99\'s Puppycat',
    username: 'puppycat99',
    password: 'puppycatSecret',
  }
  const testBlog = {
    title: 'A dream that can\'t come true',
    author: 'The Dead within',
    url: 'https://google.com.vn',
  }

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
  })

  it('Login form is shown', function () {
    cy.visit('')
    cy.contains('log in to application')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.createUser(mainTestUser)
      cy.visit('')
    })

    it('success with correct credential', function () {
      cy.get('[name="Username"').type('puppycat99')
      cy.get('[name="Password"').type('puppycatSecret')
      cy.get('[name="LoginButton"').click()
      cy.contains('puppycat99 logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('[name="Username"').type('puppycat99')
      cy.get('[name="Password"').type('puppycatSecret12')
      cy.get('[name="LoginButton"').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.contains('puppycat99 logged in').should('not.exist')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.createUser(mainTestUser)
      cy.login({
        username: mainTestUser.username,
        password: mainTestUser.password,
      })
    })

    it('A blog can be created', function () {
      cy.visit('')

      cy.get('[aria-label="blogContainer"]').should('not.exist')
      cy.contains('new blog').click()
      cy.get('[name="Title"').type('A dream that can\'t come true')
      cy.get('[name="Author"').type('The Dead within')
      cy.get('[name="Url"').type('https://google.com.vn')
      cy.get('[name="createButton"]').click()

      cy.get('.notification').should(
        'contain',
        'a new blog A dream that can\'t come true by The Dead within added'
      )
      cy.get('[aria-label="blogContainer"]').should('exist')
    })

    describe('and a blog exist', function () {
      beforeEach(function () {
        cy.createBlog(testBlog)
        cy.visit('')
      })

      it('user can like a blog', function () {
        cy.get('[aria-label="blogContainer"]').should('exist')

        cy.contains('view').click()
        cy.get('[aria-label="blogLikes"]').should('contain.text', '0')
        cy.get('[name="LikeButton"]').click()
        cy.get('[aria-label="blogLikes"]').should('contain.text', '1')
      })

      it('user can delete a blog', function () {
        cy.get('[aria-label="blogContainer"]').should('exist')

        cy.contains('view').click()
        cy.get('[name="RemoveButton"]').click()

        cy.get('[aria-label="blogContainer"]').should('not.exist')
      })
    })
  })
  describe('When there is another blog from other user', function () {
    beforeEach(function () {
      const otherUser = {
        name: 'root',
        username: 'theroot01',
        password: 'meowsekret',
      }
      cy.createUser(mainTestUser)
      cy.createUser(otherUser)
      cy.login({ username: otherUser.username, password: otherUser.password })
      cy.createBlog(testBlog)
      cy.login({
        username: mainTestUser.username,
        password: mainTestUser.password,
      })
      cy.visit('')
    })

    it.only('cannot delete that blog from other user', function () {
      cy.get('[aria-label="blogContainer"]').should('exist')

      cy.contains('view').click()
      cy.get('[name="RemoveButton"]').should('have.css', 'visibility', 'hidden')
    })
  })
})
