describe('Saved Hostels Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
  
    beforeEach(() => {
      cy.session('userSession', () => {
        cy.login('test1@gmail.com', '123456');
      });
    });
  
    it('Should load saved hostels page correctly', () => {
      cy.visit(`${baseUrl}/saved`);
      cy.contains('My Saved Hostels').should('be.visible');
    });
  
    it('Should display the correct saved hostels', () => {
      cy.visit(`${baseUrl}/saved`);
      cy.get('.saved-hostels-container').find('.card').should('have.length.at.least', 1);
    });
  
    it('Should allow the user to save a hostel', () => {
      cy.visit(`${baseUrl}/home`);
      cy.get('.card').first().find('.save-button').click();
      cy.get('.card').first().find('.save-button').should('have.class', 'saved');
    });
  
    it('Should allow the user to unsave a hostel', () => {
      cy.visit(`${baseUrl}/saved`);
      cy.get('.card').first().find('.save-button').click();
      cy.get('.card').first().find('.save-button').should('not.have.class', 'saved');
    });
  });
  