// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  // Define the 'log' task
  on('task', {
    log(message) {
      console.log('CYPRESS TASK LOG: ', message);
      return null; // Task must return null or a promise
    },
  });

  // Return the config object or plugins might not work
  return config;
};
