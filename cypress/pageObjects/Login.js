export default class Login {
    _loginUrl = '/auth/login';
    _dashboardUrl = '/pages/dashboard'
    _emailSelector = 'input[id=input-email]';
    _passwordSelector = 'input[id=input-password]';
    _checkboxSelector = 'span.custom-checkbox';
    _checkedIconSelector = 'nb-icon.custom-checkbox-icon';
    _loginButtonSelector = 'button';
    _dashboardContentSelector = 'div.content';

    navigateLogin() {
        cy.visit(this._loginUrl);
    }
    navigateDashboard() {
        cy.url().should('include', this._dashboardUrl);
    }
    fillIn({email, password}) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
    }
    get emailInput() {
        return cy.get(this._emailSelector);
    }
    get passwordInput() {
       return cy.get(this._passwordSelector);
    }
    get checkboxInput() {
        return cy.get(this._checkboxSelector);
    }
    get checkedIcon() {
        return cy.get(this._checkedIconSelector);
    }
    get dashboard() {
        return cy.get(this._dashboardContentSelector);
    }
    get loginButton() {
        return cy.get(this._loginButtonSelector);
    }

}