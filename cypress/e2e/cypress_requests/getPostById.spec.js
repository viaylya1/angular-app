
describe("get post by id", () => {

    it('should get post by id', () => {
    //Positive case
        const postId = 1;
        cy.api({
            url: `${Cypress.env('API_URL')}/posts/${postId}`
            })
            .then((response) => {  
             expect(response.status).to.eq(200);
             expect(response.body.id).to.eq(postId);
             expect(response.body.id).to.be.a('number');
             expect(response.body.userId).to.be.a('number');
             expect(response.body.userId).to.be.gt(0);
             expect(response.body).to.have.property('body').that.is.a('string');
             expect(response.body.title).to.contain('sunt')
            });
    }) 
        
    it('should give an error when invalid post id', () => {
    //Negative case
        const invalidPostId = 5555;
        cy.api({
            failOnStatusCode: false,
            url: `${Cypress.env('API_URL')}/posts/${invalidPostId}`
            })
            .then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.be.empty
            })
    })                          
})




