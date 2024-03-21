
describe("get post list", () => {

    it('should get posts list', () => {
        //Positive case
            cy.api({url: `${Cypress.env('API_URL')}/posts`})
                 .then((response) => {  
                   const lastPost = response.body[response.body.length - 1];
                   const lastPostId = lastPost.id;
    
                 expect(response.status).to.eq(200);
                 expect(response.body).to.be.an('array');
                 response.body.forEach(post => {
                    expect(post).to.have.all.keys('userId', 'id', 'title', 'body')
                });
                 expect(response.body.length).to.be.within(1, 100);
                 expect(lastPostId).to.eq(100)
                })
    })

    it('should give an error when access invalid URL', () => {
        //Negative case
            const invalidUrl = 'invalid-url'; 
            cy.api({
                url: `${Cypress.env('API_URL')}/${invalidUrl}`,
                failOnStatusCode: false
                }).then((response) => {
                expect(response.status).to.eq(404)
                })
    })
})