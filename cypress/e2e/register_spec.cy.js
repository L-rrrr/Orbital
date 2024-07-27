describe('Registration Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
  
    it('Should display register page correctly', () => {
      cy.visit(`${baseUrl}/register`);
      cy.contains('Create a New Account');
      cy.get('input[type="email"]').should('be.visible');
      cy.get('input[type="password"]').should('have.length', 2);
      cy.get('button[type="submit"]').should('be.visible');
    });
  
    it('Should show error for invalid email on register', () => {
      cy.visit(`${baseUrl}/register`);
      cy.get('input[type="email"]').type('123@1', { force: true });
      cy.get('input[type="password"]').eq(0).type('password123', { force: true });
      cy.get('input[type="password"]').eq(1).type('password123', { force: true });
      cy.get('button[type="submit"]').click();
      cy.wait(500); // Wait for 500ms to ensure the error message appears
      cy.get('span.text-red-600').should('be.visible').and('contain', 'Invalid email address.');
    });
  
    it('Should show error for short password on register', () => {
      cy.visit(`${baseUrl}/register`);
      cy.get('input[type="email"]').type('user@example.com', { force: true });
      cy.get('input[type="password"]').eq(0).type('short', { force: true });
      cy.get('input[type="password"]').eq(1).type('short', { force: true });
      cy.get('button[type="submit"]').click();
      cy.wait(500); // Wait for 500ms to ensure the error message appears
      cy.get('span.text-red-600').should('be.visible').and('contain', 'Password must be at least 6 characters long.');
    });
  
    it('Should show error for mismatched passwords', () => {
      cy.visit(`${baseUrl}/register`);
      cy.get('input[type="email"]').type('user@example.com', { force: true });
      cy.get('input[type="password"]').eq(0).type('password123', { force: true });
      cy.get('input[type="password"]').eq(1).type('differentpassword', { force: true });
      cy.get('button[type="submit"]').click();
      cy.wait(500); // Wait for 500ms to ensure the error message appears
      cy.get('span.text-red-600').should('be.visible').and('contain', 'Passwords do not match.');
    });
  
    it('Should register successfully with correct details', () => {
      cy.visit(`${baseUrl}/register`);
      cy.get('input[type="email"]').type('newuser11@example.com', { force: true });
      cy.get('input[type="password"]').eq(0).type('password123', { force: true });
      cy.get('input[type="password"]').eq(1).type('password123', { force: true });
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/home');
    });
  });
  