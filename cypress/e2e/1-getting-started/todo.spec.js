/// <reference types = "cypress" />

describe ('example to-do app', () => {
    beforeEach(()=>{
        cy.visit('https://example.cypress.io/todo')
    });
    
    it('displays two todo item by default', () => {
       cy.get('.todo-list li').should('have.length', 2),
       cy.get('.todo-list li').first().should('have.text', 'Pay electric bill'),
       cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
    })
}

)