import { defineConfig } from 'cypress';
import setupNodeEvents from './cypress/plugins/index';

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents,
    experimentalRunAllSpecs: true,
  },
  retries: {
    runMode: 2,
  },
});
