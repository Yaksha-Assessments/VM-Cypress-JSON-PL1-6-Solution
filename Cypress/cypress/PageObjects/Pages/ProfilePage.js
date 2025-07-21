class ProfilePage {

  elements = {
      myInfoTab: () => cy.contains('span.oxd-main-menu-item--name', 'My Info'),
      profileImageWrapper: () => cy.get('.orangehrm-edit-employee-image-wrapper'),
      fileInput: () => cy.get('input[type="file"]'),
      saveButton: () => cy.contains('button', 'Save'),
      uploadedImage: () => cy.get('.orangehrm-edit-employee-image-wrapper img')
    };

  // Test Case 1: Full flow of uploading image
  uploadProfilePicture(imageFileName) {
    this.elements.myInfoTab().click();
    this.elements.profileImageWrapper().click();
    this.elements.fileInput().selectFile(`cypress/fixtures/${imageFileName}`, { force: true });
    this.elements.saveButton().click();
  }
}

export default ProfilePage;
