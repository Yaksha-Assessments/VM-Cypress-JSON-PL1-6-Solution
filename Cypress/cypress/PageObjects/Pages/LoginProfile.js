class LoginPage {
  // Define selectors as class properties
  elements = {
    usernameInput: 'input[name="username"]',
    passwordInput: 'input[name="password"]',
    loginButton: 'button[type="submit"]',
    errorMsg: "//div[contains(text(),'Invalid credentials !')]",
    adminMenu: "//li[@class='dropdown dropdown-user']",
    logoutBtn: "//a[text()=' Log Out ']"
  };

  // Method to perform login using fixture
  performLogin() {

    cy.fixture('LoginData').then((credentials) => {
      //cy.log("Loaded credentials:", credentials); // 👈 Add this line to debug
    });
    cy.fixture('LoginData').then((credentials) => {
      cy.visit('/auth/login');
      cy.wait(2000); // Wait for the page to load
      cy.get(this.elements.usernameInput).type(credentials.username);
      cy.get(this.elements.passwordInput).type(credentials.password);
      cy.get(this.elements.loginButton).click();
      // print('Login successful');
      cy.url().should('include', '/dashboard');
    });
  }
}

export default LoginPage;
