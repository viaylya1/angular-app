import updatedPostBody from '../../fixtures/updatedPostBody.json';

describe("update post by id", () => {

    it('should update existing post', () => {
     //Positive case
        cy.api({
            method: 'PUT',
            url: `${Cypress.env('API_URL')}/posts/100`,
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            body: updatedPostBody
            }).as('updatedPost');
    
            cy.get('@updatedPost').its('status').should('eq', 200);
            cy.get('@updatedPost').its('body').should('deep.equal', updatedPostBody);
            cy.get('@updatedPost').its('body.title').should('contain', 'updated')                 
    })

    it('should return error when updating non-existing post', () => {
    // Negative case
        const nonExistingPostId = 9999;
        cy.api({
            failOnStatusCode: false, 
            method: 'PUT',
            url: `${Cypress.env('API_URL')}/posts/${nonExistingPostId}`,
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            body: updatedPostBody
        }).as('updatedPost');

        cy.get('@updatedPost').its('status').should('eq', 500)
    })
})