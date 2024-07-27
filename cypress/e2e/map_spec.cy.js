describe('Map Functionality on Homepage', () => {
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
    // Visit the home page
    cy.visit('/home');

    // Ensure the home page loads correctly
    cy.url().should('include', '/home');
    cy.get('.home-page').should('be.visible');
  });

  it('Should display the map with correct pins', () => {
    // Check that the map container is visible
    cy.get('.home-map-container').should('be.visible');

    // Verify that the map has loaded by checking for the presence of tiles
    cy.get('.leaflet-tile').should('have.length.greaterThan', 0);

    // Verify that markers are present (adjust the number based on your test data)
    cy.get('.leaflet-marker-icon').should('have.length.greaterThan', 0);
  });

  it('Should display popup information for each pin correctly', () => {
    // Click on each marker and check the popup content
    // cy.get('.leaflet-marker-icon').each((marker, index) => {
    //   // Click on the marker
    //   cy.wrap(marker).click();

    // Zoom out the map to ensure all markers are visible
    cy.get('.leaflet-control-zoom-out').click();  // Adjust the selector if needed
    cy.wait(500);  // Wait for the map to update

    cy.get('.leaflet-control-zoom-out').click();
    cy.wait(500);

    cy.get('.leaflet-control-zoom-out').click();
    cy.wait(500);

    // Verify that the total number of markers is 15
    cy.get('.leaflet-marker-icon').should('have.length', 15);
    // Now interact with the markers

    cy.get('.leaflet-marker-icon').each(($el, index, $list) => {
      cy.wrap($el).click({ force: true });
      // Add additional assertions or interactions here if needed
    



      // Verify the popup is visible
      cy.get('.leaflet-popup').should('be.visible');

      // Check the content of the popup (adjust based on your test data)
      cy.get('.popupContainer').should('be.visible');
      cy.get('.popupItem').should('have.length.greaterThan', 0);
      cy.get('.popupItem').each((item) => {
        cy.wrap(item).find('a').should('have.attr', 'href').and('include', '/hostel/');
        cy.wrap(item).find('span').should('contain.text', 'type');
        cy.wrap(item).find('p').should('contain.text', '$');
        cy.wrap(item).find('b').should('contain.text', 'Rating:');
      });
    });
  });

  // it('Should center the map correctly when multiple or single items are present', () => {
  //   // Mock data for single and multiple items (adjust based on your actual data)
  //   const singleItem = [{ latitude: 1.2966, longitude: 103.7764, _id: '1', name: 'Hostel 1', type: 'House', price: 500, averageRating: 4.5, ratings: [5] }];
  //   const multipleItems = [
  //     { latitude: 1.2966, longitude: 103.7764, _id: '1', name: 'Hostel 1', type: 'House', price: 500, averageRating: 4.5, ratings: [5] },
  //     { latitude: 1.3000, longitude: 103.8000, _id: '2', name: 'Hostel 2', type: 'Apartment', price: 600, averageRating: 4.0, ratings: [4] },
  //   ];

  //   // Mock API response
  //   cy.intercept('GET', '/hostels', singleItem).as('fetchSingleHostel');
  //   cy.reload();
  //   cy.wait('@fetchSingleHostel');

  //   // Verify that the map centers on the single item
  //   cy.get('.leaflet-marker-icon').should('have.length', 1);
  //   cy.get('.leaflet-marker-icon').click();
  //   cy.get('.leaflet-popup').should('contain.text', 'Hostel 1');

  //   // Mock API response for multiple items
  //   cy.intercept('GET', '/hostels', multipleItems).as('fetchMultipleHostels');
  //   cy.reload();
  //   cy.wait('@fetchMultipleHostels');

  //   // Verify that the map centers and displays all items
  //   cy.get('.leaflet-marker-icon').should('have.length', 2);
  // });



  it('should navigate to the detailed information page after clicking on a marker and then the first link', () => {
    // Step 1: Ensure markers are visible and count them
    // cy.get('.leaflet-marker-icon').should('have.length', 15);

    // Step 2: Click on the 5th marker
    cy.get('.leaflet-marker-icon').eq(4).click(); // 0-based index

    // Step 3: Click on the first link in the popup
    cy.get('.leaflet-popup-content').find('a').first().click();

    // Step 4: Verify navigation to the detailed information page
    // Here, assume the detailed page URL contains the item's ID from the 5th marker
    // Adjust the URL path and ID extraction as needed
    cy.url().should('include', '/hostel/'); // Assuming the link goes to /hostel/:id
  });
});
