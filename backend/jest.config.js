module.exports = {
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/server.js', // Exclure le fichier serveur
    '!src/docs/**', // Exclure la documentation
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.js']
};
