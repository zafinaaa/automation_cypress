import createAccountPage from "../../support/LUMA/createAccountPage"
const newAccount = require ("../../fixtures/LUMA/newAccount.json")

describe('Verify create account scenario', () => {
  const CreateAccountPage = new createAccountPage
  beforeEach (() => {
    cy.visit('/')
    cy.contains('Create an Account').should('be.visible').click()
    cy.url().should('include', 'customer/account/create/')
    cy.wait(500)
  })
  it('TC1 Verify user cannot create account with empty fields', () => {
    cy.scrollTo('bottom')
    cy.get(CreateAccountPage.createAnAccountBtn).should('be.visible').click()
    cy.verifyRequiredFields(CreateAccountPage.firstNameRequiredMsg)
    cy.verifyRequiredFields(CreateAccountPage.lastNameRequiredMsg)
    cy.verifyRequiredFields(CreateAccountPage.emailRequiredMsg)
    cy.verifyRequiredFields(CreateAccountPage.passwordErrorMsg)
    cy.verifyRequiredFields(CreateAccountPage.confrimPasswordErrorMsg)
  })
  it('TC2 Verify user cannot create account when password strength is weak and less than 8 symbols', () => {
    cy.inputData(CreateAccountPage.firstNameTxt, newAccount.firstName)
    cy.inputData(CreateAccountPage.lastNameTxt, newAccount.lastName)
    cy.inputData(CreateAccountPage.emailTxt, newAccount.email)
    cy.inputData(CreateAccountPage.passwordTxt, newAccount.invalidPassword)
    cy.verifyErrorMsg(CreateAccountPage.passwordStrengthMeter, newAccount.passwordStrengthLabel)
    cy.verifyErrorMsg(CreateAccountPage.passwordStrengthMeterLabel, newAccount.passwordLabelWeak)
    cy.verifyErrorMsg(CreateAccountPage.passwordErrorMsg, newAccount.passwordStrengthErrorMsg)
    cy.inputData(CreateAccountPage.confrimPasswordTxt, newAccount.invalidPassword)
  })
  it('TC3 Verify user cannot create account when password and confirm password do not match', () => {
    cy.inputData(CreateAccountPage.firstNameTxt, newAccount.firstName)
    cy.inputData(CreateAccountPage.lastNameTxt, newAccount.lastName)
    cy.inputData(CreateAccountPage.emailTxt, newAccount.email)
    cy.inputData(CreateAccountPage.passwordTxt, newAccount.validPassword)
    cy.verifyErrorMsg(CreateAccountPage.passwordStrengthMeter, newAccount.passwordStrengthLabel)
    cy.verifyErrorMsg(CreateAccountPage.passwordStrengthMeterLabel, newAccount.passwordLabelStrong)
    cy.inputData(CreateAccountPage.confrimPasswordTxt, newAccount.invalidPassword)
    cy.get(CreateAccountPage.createAnAccountBtn).should('be.visible').click()
    cy.verifyErrorMsg(CreateAccountPage.confrimPasswordErrorMsg, newAccount.passwordDoNotMatchErrorMsg)
  })
  it('TC4 Verify user success create new account', () => {
    cy.inputData(CreateAccountPage.firstNameTxt, newAccount.firstName)
    cy.inputData(CreateAccountPage.lastNameTxt, newAccount.lastName)
    cy.inputData(CreateAccountPage.emailTxt, newAccount.email)
    cy.inputData(CreateAccountPage.passwordTxt, newAccount.validPassword)
    cy.verifyErrorMsg(CreateAccountPage.passwordStrengthMeter, newAccount.passwordStrengthLabel)
    cy.verifyErrorMsg(CreateAccountPage.passwordStrengthMeterLabel, newAccount.passwordLabelStrong)
    cy.inputData(CreateAccountPage.confrimPasswordTxt, newAccount.validPassword)
    cy.get(CreateAccountPage.createAnAccountBtn).should('be.visible').click()
    cy.url().should('include', "customer/account/")
    cy.get('.box-information > .box-content > p').should('contain', newAccount.firstName)
  })
})