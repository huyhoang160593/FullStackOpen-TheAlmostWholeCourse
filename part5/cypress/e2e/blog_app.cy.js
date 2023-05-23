describe('Blog app', function ()  {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    beforeEach(function () {
      const testUser = {
        name: 'The 99\'s Puppycat',
        username: 'puppycat99',
        password: 'puppycatSecret'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser)
    })

    it('success with correct credential', function() {
      cy.get('[name="Username"').type('puppycat99')
      cy.get('[name="Password"').type('puppycatSecret')
      cy.get('[name="LoginButton"').click()
      cy.contains('puppycat99 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('[name="Username"').type('puppycat99')
      cy.get('[name="Password"').type('puppycatSecret12')
      cy.get('[name="LoginButton"').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .should('have.css','color', 'rgb(255, 0, 0)')
      cy.contains('puppycat99 logged in').should('not.exist')
    })
  })
})