module.exports = {
  testEnvironment: 'jsdom',
  resetModules: true,
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)(test).(ts|tsx)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/__snapshots__/',
    'coverage',
    'test/cypress',
  ],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: [
    '__stories__',
    'index.ts',
    'stories.ts',
    'stories.tsx',
  ],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  coverageDirectory: '<rootDir>/coverage',
  transform: {
    '^.+\\.(ts|tsx)?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
      },
    ],
  },
};
