const { defineConfig } = require('cypress');
const CustomReporter = require('./custom-reporter'); // Adjust the path as needed

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  viewportWidth: 1400,
  viewportHeight: 800,
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Yaksha Automation Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/web/index.php/',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      const reporter = new CustomReporter();

      on('after:spec', async (spec, results) => {
        if (results && results.tests) {
          for (const test of results.tests) {
            const status = test.state; // 'passed', 'failed', or 'skipped'
            const error = test.displayError || '';
            await reporter.logTestResult(test, status, error);
          }
        }
      });

      on('after:run', async () => {
        await reporter.onEnd();
      });

      return config;
    },
    defaultCommandTimeout: 60000,
  },
});