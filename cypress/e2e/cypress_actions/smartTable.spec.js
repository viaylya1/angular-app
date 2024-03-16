/// <reference types = "cypress" />
import SmartTable from '../../pageObjects/SmartTable';

describe("smart table", () => {
    const smartTable = new SmartTable();

    beforeEach(() =>{
        smartTable.navigate();
    })

    it('should create a new user', () => {
        smartTable.addButton.click();
        smartTable.newRow.should('exist').and('be.visible');

        const inputValues = ['222', 'Ted', 'Jonas', 'tedik', 'tedik@gmail.com', '22'];
        smartTable.enterInputValues(inputValues);
        smartTable.saveButton.click();
        
        smartTable.verifyNewlyCreatedUser(inputValues)
    });

    it('should edit a user', () => {
        const updateValues = ['111', 'kNew', 'oNew', 'oNew', 't', '0'];

        smartTable.chosenRow.within(() =>{
        smartTable.editButton.click();
        smartTable.editExistingUser(updateValues);
        smartTable.editSaveButton.click();   
        });

        smartTable.verifyEditedUser(updateValues);
    });
})