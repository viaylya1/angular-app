import emptyPostsList from '../../fixtures/emptyPostsList.json';

describe("create a new post", () => {
    it('should create new post with required keys', () => {
        //Positive case
            const newPostBody = {
                "userId": 11,
                "id": 101,
                "title": "New post",
                "body": "New body"
            };
            cy.api({
                method: 'POST',
                url: `${Cypress.env('API_URL')}/posts`,
                headers: {'Content-type': 'application/json; charset=UTF-8'},
                body: newPostBody
                }).as('newPost');
    
            cy.get('@newPost').its('body').should('deep.equal', newPostBody);
            cy.get('@newPost').its('status').should('eq', 201)  
        })

    it('should create new post with additional optional keys', () => {
        //Negative case
            const optionalPostBody = {
                "userId": 11,
                "id": 101,
                "title": "New post",
                "body": "New body",
                "customKey": "Additional field"
            };
            cy.api({
                method: 'POST',
                url: `${Cypress.env('API_URL')}/posts`,
                headers: {'Content-type': 'application/json; charset=UTF-8'},
                body: optionalPostBody
            }).as('optionalPost');
    
            cy.get('@optionalPost').its('body').should('deep.equal', optionalPostBody);
            cy.get('@optionalPost').its('status').should('eq', 201)
        })

    it('should create post without required keys', () => {
        // Negative case
            cy.api({
                method: 'POST',
                url: `${Cypress.env('API_URL')}/posts`,
                headers: {'Content-type': 'application/json; charset=UTF-8'},
                body: emptyPostsList
            }).then((response) => {
               expect(response.body.id).to.eq(101)
            })
        })
})