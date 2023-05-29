// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('inputData', (locator, value) => 
{ 
    cy.get(locator).should('be.visible').type(value)
})

Cypress.Commands.add('verifyRequiredFields', (locator) => 
{ 
    cy.get(locator).should('contain', 'This is a required field.')
})

Cypress.Commands.add('verifyErrorMsg', (locator, value) => 
{ 
    cy.get(locator).should('be.visible').should('contain', value)
})
 
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })