describe('Authentication Tests', () => {
  const baseUrl = Cypress.config('baseUrl');

  it('Should display login page correctly', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('div').contains('NUStay');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('Should show error for invalid email', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[type="email"]').type('abc@1');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.wait(500); // Wait for 500ms to ensure the error message appears
    cy.contains('Invalid email address.').should('be.visible');
  });

  it('Should show error for short password', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[type="email"]').type('test@gmail.com');
    cy.get('input[type="password"]').type('short');
    cy.get('button[type="submit"]').click();
    cy.wait(500); // Wait for 500ms to ensure the error message appears
    cy.contains('Password must be at least 6 characters long.').should('be.visible');
  });

  it('Should show error for incorrect credentials', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[type="email"]').type('test@gmail.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    cy.wait(500); // Wait for 500ms to ensure the error message appears
    cy.contains('Incorrect password. Please try again.').should('be.visible');
  });

  it('Should log in successfully with correct credentials', () => {
    cy.visit(`${baseUrl}/login`);
    cy.get('input[type="email"]').type('test@gmail.com');
    cy.get('input[type="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
  });
});