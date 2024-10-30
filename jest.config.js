module.exports = {
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    passWithNoTests: true,
    verbose: false,
    clearMocks: true,
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testMatch: ['**/?(*.)+(test).ts?(x)'],
    reporters: ['default'],
};
