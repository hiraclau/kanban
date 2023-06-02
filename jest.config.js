/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: '<html lang="pt-BR"></html>',
    url: 'https://jestjs.io/',
    userAgent: 'Agent/007',
  },
};

module.exports = config;
