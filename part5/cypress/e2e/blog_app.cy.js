describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
  })

  it('Login form is shown', function () {
    cy.visit('')
    cy.contains('log in to application')
  })

  describe('Login', function () {
    beforeEach(function () {
      const testUser = {
        name: 'The 99\'s Puppycat',
        username: 'puppycat99',
        password: 'puppycatSecret',
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser)
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
      const testUser = {
        name: 'The 99\'s Puppycat',
        username: 'puppycat99',
        password: 'puppycatSecret',
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser)
      cy.login({ username: testUser.username, password: testUser.password })
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
        const testBlog = {
          title:'A dream that can\'t come true',
          author: 'The Dead within',
          url: 'https://google.com.vn'
        }
        cy.createBlog(testBlog)
        cy.visit('')
      })

      it.only('user can like a blog', function () {
        cy.get('[aria-label="blogContainer"]').should('exist')

        cy.contains('view').click()
        cy.get('[aria-label="blogLikes"]').should('contain.text', '0')
        cy.get('[name="LikeButton"]').click()
        cy.get('[aria-label="blogLikes"]').should('contain.text', '1')
      })
    })
  })
})
