class AdminPage {


  elements = {
    adminTab: () => cy.contains('span.oxd-main-menu-item--name', 'Admin'),
    // Test Case 2
    editButton: () => cy.get('i.bi-pencil-fill').first(),
    editFormContainer: () => cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title'),
    sortButton: () => cy.get('div.oxd-table-header-cell').contains('Username'),
    userTable: () => cy.get('.oxd-table'),
    userRows: () => cy.get('.oxd-table-cell:nth-child(2)'),

    userRoleDropdown: () => cy.get('label').contains('User Role').parents('.oxd-input-group').find('.oxd-select-text'),
    userRoleOption: (role) => cy.get('.oxd-select-dropdown').contains(role),
    searchButton: () => cy.get('button').contains('Search'),
    adminTab: () => cy.contains('span.oxd-main-menu-item--name', 'Admin'),
    userRoleCells: () => cy.get('.oxd-table-cell:nth-child(3)'), // Assuming 3rd column is Role

    // userRoleDropdown: () => cy.get('div').contains('-- Select --'),
    // adminOption: () => cy.get('div[role="option"]').contains('Admin'),
    // searchButton: () => cy.get('button[type="submit"]').contains('Search'),
    // userRoleColumn: () => cy.get('.oxd-table-cell').contains('Admin')

  }

  // Test Case 2 : Verify the Edit Form Appears
  editUserFormAppear() {
    this.elements.adminTab().should('be.visible').click();
    cy.wait(1000); // Wait for table to load
    this.elements.editButton().should('be.visible').click();
  }
  
  // Test Case 3: Verify Admin Table Sorting
  goToAdminAndSortByUsername() {
    this.elements.adminTab().should('be.visible').click();
    this.elements.sortButton().should('be.visible').click();
  }
  // Test Case 4: Verify Upgrade page loads correctly after clicking the button
  NavigateToAdminPage() {
    this.elements.adminTab().should('be.visible').click();
    cy.wait(1000); // Wait for table to load
  }
  // Test Case 5: Verify User Deletion
  visitAdminForTolltip() {
    this.elements.adminTab().should('be.visible').click();
  }

  // Test Case 6: Verify User Edit Form Appears
  searchAdminUsersByRole() {
    this.elements.adminTab().click();
    this.elements.userRoleDropdown().click();
    this.elements.userRoleOption('Admin').should('be.visible').click();
    this.elements.searchButton().click();
  }

}

export default AdminPage;
