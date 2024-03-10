/// <reference types = "cypress" />

describe("stepper", () => {
    const containerSelector = 'nb-stepper[orientation="horizontal"]';
    const stepSelector = `${containerSelector} div.header div.step`

    beforeEach(() =>{
        cy.visit('/pages/layout/stepper');
        cy.get('nb-stepper[orientation="horizontal"] button').contains('prev').as('prev');
        cy.get('nb-stepper[orientation="horizontal"] button').contains('next').as('next');
    });

    it('title and buttons should work', () => {
        
        cy.get(`${containerSelector} h3`).should('have.text', 'Step content #1')

        cy.get('@prev').should('be.disabled');
        cy.get('@next').click();
        cy.get(`${containerSelector} h3`).should('have.text', 'Step content #2');

        cy.get('@prev').should('be.enabled');
        cy.get('@next').click();
        cy.get(`${containerSelector} h3`).should('have.text', 'Step content #3');

        cy.get('@prev').should('be.enabled');
        cy.get('@next').click();
        cy.get(`${containerSelector} h3`).should('have.text', 'Step content #4');

        cy.get('@prev').should('be.enabled');
        cy.get('@next').should('be.disabled');
    });

    it('step progress should work', () => {
        cy.get(stepSelector).should('have.length', 4).as('allSteps');
 
        // Below I'll check each step with different approach so that to practice, but the last approach is better

        cy.get('@allSteps')
        .eq(0)
        .should('have.class', 'selected')
        .siblings()
        .should('not.have.class', 'selected').and('not.have.class', 'completed');

        cy.get('@next').click();

        cy.get('@allSteps')
        .then(($steps) => {
           cy.wrap($steps)
           .each(($step, index) => {
            if (index === 0) {
                // First step
                expect($step).to.have.class('completed'); 
                expect($step).to.not.have.class('selected'); 
              } else if (index === 1) {
                // Second step
                expect($step).to.have.class('selected'); 
                expect($step).to.not.have.class('completed'); 
              } else {
                // Other steps
                expect($step).to.not.have.class('selected'); 
                expect($step).to.not.have.class('completed');
           }})
        });

        cy.get('@next').click();
        
        cy.get('@allSteps')
        .then(($steps) => {
           cy.wrap($steps)
           .each(($step, index) => {
            if (index === 0 || index ===1) {
                // First and Second step
                expect($step).to.have.class('completed'); 
                expect($step).to.not.have.class('selected'); 
              } else if (index === 2) {
                // Third step
                expect($step).to.have.class('selected'); 
                expect($step).to.not.have.class('completed'); 
              } else {
                // Forth step
                expect($step).to.not.have.class('selected'); 
                expect($step).to.not.have.class('completed');
           }})
        });

        cy.get('@next').click();

        cy.get('@allSteps')
        .eq(3).should('have.class', 'selected')
        .prevAll().should('have.class', 'completed').and('not.have.class', 'selected');

        })
    })
