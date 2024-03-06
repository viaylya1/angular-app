/// <reference types = "cypress" />

describe("stepper", () => {
    it("should work", () => {
        const containerSelector = 'nb-stepper[orientation="horizontal"]';
        cy.visit('/pages/layout/stepper');

        cy.get(`${containerSelector} h3`).should('have.text', 'Step content #1')

        cy.get(`${containerSelector} button`).contains('prev').should('be.disabled');
        cy.get(`${containerSelector} button`).contains('next').click();
        cy.get(`${containerSelector} h3`).should('have.text', 'Step content #2');

        cy.get(`${containerSelector} button`).contains('prev').should('be.enabled');
        cy.get(`${containerSelector} button`).contains('next').click();
        cy.get(`${containerSelector} h3`).should('have.text', 'Step content #3');

        cy.get(`${containerSelector} button`).contains('prev').should('be.enabled');
        cy.get(`${containerSelector} button`).contains('next').click();
        cy.get(`${containerSelector} h3`).should('have.text', 'Step content #4');

        cy.get(`${containerSelector} button`).contains('prev').should('be.enabled');
        cy.get(`${containerSelector} button`).contains('next').should('be.disabled');
    })
})