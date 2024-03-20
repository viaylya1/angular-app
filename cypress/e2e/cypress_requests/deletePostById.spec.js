
describe("delete post by id", () => {

    it('should delete existing post by id', () => {
    //Positive cases      
        cy.api({
           method:'DELETE', 
           url:`${Cypress.env('API_URL')}/posts/1`
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.empty
        })
    })

    it('should delete without error non-existing post', () => {
    // Negative case
        const nonExistingtPostId = 9999
        cy.api({
           method: 'DELETE',
           url: `${Cypress.env('API_URL')}/posts/${nonExistingtPostId}`
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    })
})