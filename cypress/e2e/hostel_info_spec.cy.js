describe('Hostel Information Page Tests', () => {
  const baseUrl = Cypress.config('baseUrl');
  const hostelId = '667ecf66fcb4f170e6762293'; // a valid hostel ID for testing

  before(() => {
    // Log in before running the tests
    cy.visit(`${baseUrl}/login`);
    cy.get('input[type="email"]').should('be.visible').type('test1@gmail.com');
    cy.get('input[type="password"]').should('be.visible').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
  });

  beforeEach(() => {
    // Navigate to the hostel info page before each test
    cy.visit(`${baseUrl}/hostel/${hostelId}`);
    cy.get('.hostel-info-page').should('be.visible');
  });

  it('Should render hostel information page correctly', () => {
    // Check for the presence of hostel information
    cy.get('.title').should('be.visible');
    cy.get('.hostel-info-details').should('be.visible');
    cy.get('.hostel-info-image').should('be.visible');
    cy.get('.map-container').should('be.visible');
    cy.get('.comments-container').should('be.visible');
  });

  it('Should display hostel images in the slider', () => {
    // Check that the slider component is visible and can navigate images
    cy.get('.hostel-info-image .slider').should('be.visible');
    cy.get('.hostel-info-image .slider img').should('have.length.at.least', 1);
  });

  it('Should display correct hostel information', () => {
    // Check the hostel information details
    cy.get('.hostel-info-details').within(() => {
      cy.get('p').contains('Type:').should('be.visible');
      cy.get('p').contains('Price:').should('be.visible');
      cy.get('p').contains('Average rating:').should('be.visible');
      cy.get('p').contains('Meal Plan:').should('be.visible');
      cy.get('p').contains('Academic Programmes:').should('be.visible');
      cy.get('p').contains('Hostel Activities:').should('be.visible');
      cy.get('p').contains('Description:').should('be.visible');
    });
  });

  it('Should render hostel rating component correctly', () => {
    // Check that the rating component is present and contains necessary elements
    cy.get('.hostel-info-details').within(() => {
      cy.get('.rating-container').should('be.visible');
      cy.get('.rating-container').contains('Rate from 1-5 for this hostel:').should('be.visible');
    });
  });

  it('Should allow user to submit a rating', () => {
    // Simulate a rating submission
    cy.get('.rating-container').within(() => {
      cy.get('.star').first().click(); // Click on the first star
      cy.wait(500); // Ensure the DOM updates
      cy.get('.user-rating').should('be.visible');
      cy.get('.user-rating').contains('Your rating for this hostel is 1 stars').should('be.visible');
    });
  });

  it('Should allow user to edit their rating', () => {
    // Simulate editing a rating
    cy.get('.rating-container').within(() => {
      cy.get('.edit-button').click();
      cy.get('.rating-edit').should('be.visible');
      cy.get('.star').last().click(); // Click on the last star
      cy.wait(500); // Ensure the DOM updates
      cy.get('.user-rating').should('be.visible');
      cy.get('.user-rating').contains('Your rating for this hostel is 5 stars').should('be.visible');
    });
  });

  it('Should allow user to delete their rating', () => {
    // Simulate deleting a rating
    cy.get('.rating-container').within(() => {
      cy.get('.delete-button').click();
      cy.get('.rating-edit').should('be.visible');
    });
  });
});
