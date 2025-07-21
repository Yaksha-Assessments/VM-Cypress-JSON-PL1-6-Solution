class BuzzPage {
  elements = {
    buzzTab: () => cy.contains('span.oxd-main-menu-item--name', 'Buzz'),
    sharePhotoButton: () => cy.contains('button', 'Share Photo'),
    imageUploadArea: () => cy.get('div.orangehrm-photo-upload-area').contains('Add Photos'),
    fileInput: () => cy.get('input[type="file"]', { timeout: 10000 }),

    // Test Case 7
    shareButton : () => cy.get('button.oxd-button.oxd-button--medium.oxd-button--main').contains('Share'),

    shareTextArea: () => cy.get('textarea[placeholder*="What\'s on your mind"]'),
    uploadedImage: () => cy.get('img[src*="uploaded"]'),
    uploadSuccessToast: () => cy.contains('.oxd-toast-content-text', 'Successfully Saved'),

    // Test Case 8
    firstPostContainer: () => cy.get('.orangehrm-buzz-post').first(),
    firstLikeButton: () =>
      cy.get('.orangehrm-buzz-post').first().find('svg#heart-svg'),
    firstLikeCountText: () =>
      cy.get('.orangehrm-buzz-post').first().find('div.orangehrm-buzz-stats').find('p').contains('Like'),

    // Test Case 9
    commentIconOnFirstPost: () =>
      cy.get('i.oxd-icon.bi-chat-text-fill', { timeout: 10000 })
        .first()
        .should('exist')
        .parents('button'),

    commentInput: () =>
      cy.get('input[placeholder="Write your comment..."]', { timeout: 10000 }),

    // Test Case 10
    moreOptionsButton: () =>
      cy.get('i.oxd-icon.bi-three-dots').parents('button'),

    editPostOption: () =>
      cy.contains('li.orangehrm-buzz-post-header-config-item p', 'Edit Post'),

    editTextArea: () =>
      cy.get('.oxd-dialog-container-default textarea.oxd-buzz-post-input').first(),

    postButton: () =>
      cy.get('.oxd-dialog-container-default button[type="submit"]').contains('Post').first(),

  }
  
  // Test Case 7
  postImageWithTimestampText(imageName , postMessage) {

    this.elements.buzzTab().should('be.visible').click();
    cy.url().should('include', '/buzz');

    this.elements.sharePhotoButton().should('be.visible').click();
    this.elements.imageUploadArea().should('be.visible').click();

    // Wait for input[type="file"] to attach
    cy.waitUntil(() => {
      return cy.document().then(doc => {
        const input = doc.querySelector('input[type="file"]');
        return input && Cypress.dom.isAttached(Cypress.$(input));
      });
    }, {
      timeout: 8000,
      interval: 300,
      errorMsg: 'input[type="file"] never stabilized'
    });

    // Upload image dynamically
    cy.document().then(doc => {
      const input = doc.querySelector('input[type="file"]');
      if (!input) throw new Error('input[type="file"] disappeared before selection');

      cy.wrap(input).selectFile(`cypress/fixtures/${imageName}`, {
        action: 'drag-drop',
        force: true
      });
    });

    // Add timestamped post text
    cy.get('textarea[placeholder*="What\'s on your mind"]').should('be.visible').eq(1).type(postMessage);

    // Click Post
    this.elements.shareButton().should('be.visible').and('not.be.disabled').click({ force: true });
    cy.wait(10000); // Wait for the post to be created
    cy.reload();
    // Store message for later verification
    cy.wrap(postMessage).as('sharedPostMessage');
  }

// Test Case 8 Objects

  getFirstPost() {
      return cy.get('div.oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-buzz').first();
    }

  getLikeCount($post) {
    return cy.wrap($post)
      .find('.orangehrm-buzz-stats p')
      .contains('Like')
      .invoke('text')
      .then((text) => {
        const match = text.match(/(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      });
  }
  getFirstLikeCount() {
  return cy.get('div.oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-buzz')
    .first()
    .find('.orangehrm-buzz-stats p')
    .contains('Like')
    .invoke('text')
    .then((text) => {
      const match = text.match(/(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    });
}


  clickLikeButton($post) {
    return cy.wrap($post)
      .find('path.orangehrm-heart-icon-path')
      .first()
      .click();
  }


    




  addCommentToFirstPost(commentText) {
    this.elements.buzzTab().should('be.visible').click();
    
    this.elements.commentIconOnFirstPost()
      .scrollIntoView()
      .click({ force: true });

    this.elements.commentInput()
      .should('be.visible')
      .type(`${commentText}{enter}`);
  }

  editFirstPostWithText(newText) {
    this.elements.buzzTab().should('be.visible').click();
    
    
    this.elements.moreOptionsButton()
    .first()
    .click({ force: true });

  this.elements.editPostOption()
    .click({ force: true });

  cy.get('.oxd-dialog-container-default')
    .should('exist')
    .and('be.visible');

  this.elements.editTextArea()
    .should('be.visible')
    .clear({ force: true })
    .type(newText, { force: true });

  // 🔧 Scroll to the Post button before clicking
  this.elements.postButton()
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });
  }



}

 

export default BuzzPage;
