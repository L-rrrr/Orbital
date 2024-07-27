describe('Profile Page Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
  
    before(() => {
      // Log in before running the tests
      cy.visit(`${baseUrl}/login`);
      cy.get('input[type="email"]').should('be.visible').type('test1@gmail.com');
      cy.get('input[type="password"]').should('be.visible').type('123456');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/home');
    });
  
    beforeEach(() => {
      // Navigate to the profile page before each test
      cy.visit(`${baseUrl}/profile`);
      cy.get('.fields').should('be.visible');
    });
  
    it('Should display the current username', () => {
      cy.get('p').contains('Your current username is:').should('be.visible');
    });
  
    it('Should update the username successfully', () => {
      cy.get('input[type="text"]').clear().type('newuser');
      cy.get('button').contains('Update Username').click();
      cy.get('p').contains('Your current username is: newuser').should('be.visible');
    });
  
    it('Should show an error for username longer than 10 characters', () => {
      cy.get('input[type="text"]').clear().type('thisisaverylongusername');
      cy.get('button').contains('Update Username').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Username must be less than 10 characters!');
      });
    });
  
    it('Should show an error for empty username', () => {
      cy.get('input[type="text"]').clear();
      cy.get('button').contains('Update Username').click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Username cannot be empty!');
      });
    });
  
    it('Should allow the user to choose a profile image', () => {
      const imagePath = 'images/sample.jpg'; // Replace with a valid image path
      cy.get('#fileInput').attachFile(imagePath);
      cy.get('.avatar').should('have.attr', 'src').and('include', 'blob:');
    });
  
    it('Should upload the profile image successfully', () => {
      const imagePath = 'images/sample.jpg'; // Replace with a valid image path
      cy.get('#fileInput').attachFile(imagePath);
      cy.get('.upload-button').click();
      cy.get('.avatar').should('have.attr', 'src').and('include', 'firebase');
    });
  });
  