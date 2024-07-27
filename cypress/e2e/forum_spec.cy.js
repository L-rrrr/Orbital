describe('Forum Feature Tests', () => {
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
      // Navigate to the forum page before each test
      cy.visit(`${baseUrl}/forum`);
      cy.get('.forum-content-container').should('be.visible');
    });
  
    it('Should create a new post successfully', () => {
      cy.get('.create-post-button').click();
      cy.url().should('include', '/forum/createpost');
      cy.get('#create-post-title').type('Test Post Title');
      cy.get('#create-post-body').type('This is the body of the test post.');
      cy.get('.button-create-post-page').contains('Create Post').click();
      cy.url().should('include', '/forum');
      cy.contains('Test Post Title', { timeout: 10000 }).should('be.visible');
    });
  
    it('Should view all posts on the forum page', () => {
      cy.visit(`${baseUrl}/forum`);
      //cy.get('.forum-posts-container').should('be.visible');
      cy.get('.forum-posts-container').should('have.length.greaterThan', 0);
    });
  
    it('Should edit a post successfully', () => {
      
        cy.url().should('include', '/forum');
        cy.get('.forum-posts-container').within(() => {
            cy.get('.post-container').within(() => {
            cy.get('.post-header').contains('Test Post Title').within(() => {
                cy.get('.post-actions').within(() => {
                cy.get('.edit-post-button').click();
                });
            });
        });
    });
      
        cy.get('.edit-title-input').clear().type('Edited Test Post Title');
        cy.get('.edit-body-textarea').clear().type('This is the edited body of the test post.');
        cy.get('.submit-button').click();
        
        cy.url().should('include', '/forum');
        cy.get('.forum-posts-container').within(() => {
          cy.get('.post-container').contains('Edited Test Post Title', { timeout: 10000 }).should('be.visible');
        });
      });
  
    it('Should upvote a post successfully', () => {
      cy.contains('.forum-posts-container', 'Edited Test Post Title').click();
      cy.url().should('include', '/forum/');
      cy.get('.upvote-button').click();
      cy.get('.upvote-button').contains('1').should('be.visible');
      cy.get('.upvote-button').click(); // Undo upvote
      cy.get('.upvote-button').contains('0').should('be.visible');
    });
  
    it('Should add a comment to a post successfully', () => {
      cy.contains('.forum-posts-container', 'Edited Test Post Title').click();
      cy.url().should('include', '/forum/');
      cy.get('#create-comment-input').type('This is a test comment.');
      cy.get('#submit-comment-button').click();
      cy.contains('#comments-container', 'This is a test comment.', { timeout: 10000 }).should('be.visible');
    });
  
    it('Should view all comments on the comments page', () => {
      cy.contains('.forum-posts-container', 'Edited Test Post Title').click();
      cy.url().should('include', '/forum/');
      cy.get('#comments-container').should('be.visible');
      cy.get('#comments-container .comment-container').should('have.length.greaterThan', 0);
    });
  
    it('Should edit a comment successfully', () => {
      cy.contains('.forum-posts-container', 'Edited Test Post Title').click();
      cy.url().should('include', '/forum/');
      cy.contains('#comments-container', 'This is a test comment.').parent().find('#edit-comment').click();
      cy.get('#edit-comment-input').clear().type('This is an edited test comment.');
      cy.get('.submit-button').click();
      cy.contains('#comments-container', 'This is an edited test comment.', { timeout: 10000 }).should('be.visible');
    });
  
    it('Should upvote a comment successfully', () => {
      cy.contains('.forum-posts-container', 'Edited Test Post Title').click();
      cy.url().should('include', '/forum/');
      cy.contains('#comments-container', 'This is an edited test comment.').parent().find('.upvote-button').click();
      cy.contains('#comments-container', 'This is an edited test comment.').parent().find('.upvote-button').contains('1').should('be.visible');
      cy.contains('#comments-container', 'This is an edited test comment.').parent().find('.upvote-button').click(); // Undo upvote
      cy.contains('#comments-container', 'This is an edited test comment.').parent().find('.upvote-button').contains('0').should('be.visible');
    });
  
    it('Should add a reply to a comment successfully', () => {
      cy.contains('.forum-posts-container', 'Edited Test Post Title').click();
      cy.url().should('include', '/forum/');
      cy.contains('#comments-container', 'This is an edited test comment.').parent().find('.reply-button').click();
      cy.get('#reply-input').type('This is a test reply.');
      cy.get('.submit-button').click();
      cy.contains('#comments-container', 'This is a test reply.', { timeout: 10000 }).should('be.visible');
    });
  
    it('Should edit a reply successfully', () => {
      cy.contains('.forum-posts-container', 'Edited Test Post Title').click();
      cy.url().should('include', '/forum/');
      cy.contains('#comments-container', 'This is a test reply.').parent().find('.reply-actions button').first().click();
      cy.get('#reply-input').clear().type('This is an edited test reply.');
      cy.get('.submit-button').click();
      cy.contains('#comments-container', 'This is an edited test reply.', { timeout: 10000 }).should('be.visible');
    });
  
    it('Should delete a reply successfully', () => {
      cy.contains('.forum-posts-container', 'Edited Test Post Title').click();
      cy.url().should('include', '/forum/');
      cy.contains('#comments-container', 'This is an edited test reply.').parent().find('.reply-actions button').last().click();
      cy.contains('#comments-container', 'This is an edited test reply.', { timeout: 10000 }).should('not.exist');
    });
  
    after(() => {
      // Delete comment
      cy.visit(`${baseUrl}/forum`);
      cy.contains('.forum-posts-container', 'Edited Test Post Title').click();
      cy.url().should('include', '/forum/');
      cy.contains('#comments-container', 'This is an edited test comment.').parent().find('#delete-comment').click();
      cy.contains('#comments-container', 'This is an edited test comment.', { timeout: 10000 }).should('not.exist');
      
      // Delete post
      cy.visit(`${baseUrl}/forum`);
      cy.contains('.forum-posts-container', 'Edited Test Post Title').click();
      cy.url().should('include', '/forum/');
      cy.get('.delete-post-button').click();
      cy.contains('.forum-posts-container', 'Edited Test Post Title', { timeout: 10000 }).should('not.exist');
    });
  });
