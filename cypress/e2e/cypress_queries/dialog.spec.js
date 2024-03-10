/// <reference types = "cypress" />

describe("dialog", () => {

    beforeEach(() =>{
        cy.visit('/pages/modal-overlays/dialog');
    })

    it('should open the dialog when "Enter Name" button is clicked', () => {
        cy.contains('.result-from-dialog button', 'Enter Name').click();
        cy.get('nb-dialog-container').should('exist').and('be.visible');
    })

    it('should be displayed "Enter your name" title and close the dialog when "Cancel" button is clicked', () => {

        cy.contains('.result-from-dialog button', 'Enter Name').click();
        cy.get('nb-dialog-container').as('container');
        cy.get('@container').find('nb-card-header').should('have.text', 'Enter your name');
        cy.get('@container').find('nb-card-footer button').first().should('have.text', 'Cancel').click();
        cy.get('div.cdk-overlay-container').children().should('not.exist');
    });


    it('should allow inputting a name and submitting the form', () => {

        cy.contains('.result-from-dialog button', 'Enter Name').click();
        cy.get('nb-dialog-container').as('container');
        cy.get('@container').find('nb-card-body input').should('have.attr', 'placeholder', 'Name').type('Vika');
        cy.get('@container').find('nb-card-footer button').last().should('have.text', 'Submit').click();
        cy.get('div.cdk-overlay-container').children().should('not.exist')

    });

})

        