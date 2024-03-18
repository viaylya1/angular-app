/// <reference types = "cypress" />
import Login from '../../pageObjects/Login';

describe("login with POM", () => {
    const login = new Login();

    beforeEach(() =>{
        login.navigateLogin();
    })

    it('should successfully login', () => {
       const userData = {
        email: 'victory@gmail.com',
        password: 'victory222'
       }

        login.loginButton.contains('Log In').should('be.disabled');
        login.fillIn(userData);
        login.loginButton.contains('Log In').should('be.enabled');
        login.checkboxInput.click();
        login.checkedIcon.should('be.visible').and('exist');
        login.loginButton.contains('Log In').click();
        cy.wait(5000);
        login.navigateDashboard();
        login.dashboard.should('be.visible')
    })
});

describe("login with Custom Commands", () => {

    beforeEach(() =>{
        cy.visit('auth/login');
    })

    it('should successfully login', () => {
        const userData = {
            email: 'victory@gmail.com',
            password: 'victory222'
           }
    
        cy.getLoginButton().should('be.disabled');
        cy.fillLoginForm(userData);
        cy.getLoginButton().should('be.enabled');
        cy.setLoginCheckbox();
        cy.getLoginButton().click();
        cy.wait(5000);
        cy.url().should('include', '/pages/dashboard');
        cy.get('div.content').should('be.visible')
    })
})