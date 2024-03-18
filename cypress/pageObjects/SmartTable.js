export default class SmartTable {
    _url = '/pages/tables/smart-table';
    _addButtonSelector = 'th[ng2-st-add-button] a.ng2-smart-action';
    _newRowSelector = 'tr[ng2-st-thead-form-row]';
    _newCellSelector = 'thead ng2-smart-table-cell';
    _saveButtonSelector ='thead ng2-st-actions a.ng2-smart-action-add-create';
    _addedRowSelector ='tbody tr.selected';
    _addedCellSelector = 'div.ng-star-inserted';
    _chosenRowSelector ='tbody tr';
    _chosenCellSelector='td:not(.ng2-smart-actions)';
    _editButtonSelector = 'a.ng2-smart-action-edit-edit';
    _editSaveButtonSelector = 'a.ng2-smart-action-edit-save';



    navigate() {
        cy.visit(this._url);
    }
    enterInputValues(inputValues) {
        inputValues.forEach((value, index) => {
            this.newCells.eq(index).type(value);
        });
    }
    verifyNewlyCreatedUser(inputValues) {
        this.newlyAddedRow.each(($value, index) => {
            const value = $value.text().trim();
            const expectedValue = inputValues[index];
            expect(value).to.equal(expectedValue);
        });
    }
    editExistingUser(updateValues) {
        updateValues.forEach((value, index) => {
            this.chosenCells.eq(index).type('{backspace}').type(value);
        });
    }
    verifyEditedUser(updateValues) {
        const existingValues = [];
        this.chosenCells.each(($cell) => {
            cy.wrap($cell).invoke('text').then(text => {
                existingValues.push(text.trim())
                })
            });
        this.editedRow.each(($value, index) => {
            const value = $value.text().trim();
            const expectedValue = existingValues[index];
            expect(value).to.equal(expectedValue);
        });
    }
    get addButton() {
        return cy.get(this._addButtonSelector);
    }
    get newRow() {
        return cy.get(this._newRowSelector);
    }
    get newCells() {
        return cy.get(this._newCellSelector);
    }
    get saveButton() {
        return cy.get(this._saveButtonSelector);
    }
    get newlyAddedRow() {
        return cy.get(this._addedRowSelector).find(this._addedCellSelector);
    }
    get chosenRow() {
        return  cy.get(this._chosenRowSelector).first();
    }
    get chosenCells() {
        return   cy.get(this._chosenCellSelector);
    }
    get editButton() {
        return   cy.get(this._editButtonSelector);
    }
    get editSaveButton() {
        return  cy.get(this._editSaveButtonSelector);
    }
    get editedRow() {
        return  cy.get(this._chosenRowSelector).first().find(this._chosenCellSelector);
    }    
}


