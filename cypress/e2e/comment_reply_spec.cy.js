/// <reference types="cypress" />

describe('Comment and Reply Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
    const hostelId = '667ecf66fcb4f170e6762293'; // Use a valid hostel ID for testing
    const commentText = 'This is a test comment';
    const editedCommentText = `${commentText} edited`;
    const replyText = 'This is a test reply';
    const editedReplyText = `${replyText} edited`;
  
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
  
    it('Should add a new comment', () => {
      cy.get('#create-comment-input').should('be.visible').type(commentText);
      cy.get('#submit-comment-button').click();
      cy.wait(1000); // Wait for the comment to be submitted
      cy.get('#comments-container').contains(commentText).should('be.visible');
    });
  
    it('Should edit an existing comment', () => {
      cy.get('#comments-container').contains(commentText).parents('#comment-container').within(() => {
        cy.get('#edit-comment').click();
        cy.get('textarea').clear().type(editedCommentText);
        cy.get('.submit-button').click();
      });
      cy.wait(1000); // Wait for the comment to be edited
      cy.get('#comments-container').contains(editedCommentText).should('be.visible');
    });
  
    it('Should add a reply to a comment', () => {
      cy.get('#comments-container').contains(editedCommentText).parents('#comment-container').within(() => {
        cy.get('.reply-button').click();
        cy.get('textarea').should('be.visible').type(replyText);
        cy.get('.submit-button').click();
      });
      cy.wait(1000); // Wait for the reply to be submitted
      cy.get('#comments-container').contains(replyText).should('be.visible');
    });
  
    it('Should edit a reply', () => {
      cy.get('#comments-container').contains(replyText).parents('#reply-container').within(() => {
        cy.get('.reply-actions button').first().click(); // Click edit button
        cy.get('textarea').clear().type(editedReplyText);
        cy.get('.submit-button').click();
      });
      cy.wait(1000); // Wait for the reply to be edited
      cy.get('#comments-container').contains(editedReplyText).should('be.visible');
    });
  
    it('Should upvote a comment', () => {
      cy.get('#comments-container').contains(editedCommentText).parents('#comment-container').within(() => {
        cy.get('.upvote-button').click();
        cy.get('.upvote-button').should('contain', '1');
      });
    });
  
    it('Should delete a reply', () => {
      cy.get('#comments-container').contains(editedReplyText).parents('#reply-container').within(() => {
        cy.get('.reply-actions button').last().click(); // Click delete button
      });
      cy.wait(1000); // Wait for the reply to be deleted
      cy.get('#comments-container').contains(editedReplyText).should('not.exist');
    });
  
    it('Should delete a comment', () => {
      cy.get('#comments-container').contains(editedCommentText).parents('#comment-container').within(() => {
        cy.get('#delete-comment').click();
      });
      cy.wait(1000); // Wait for the comment to be deleted
      cy.get('#comments-container').contains(editedCommentText).should('not.exist');
    });
  });
  