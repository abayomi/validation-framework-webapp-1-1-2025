module.exports = {
    testEnvironment: "jsdom",
    verbose: true,
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "@swc/jest",
      "^.+\\.css$": "jest-css-modules-transform"
    },
    transformIgnorePatterns: [
      "node_modules/(?!(your-module|another-module)/)",
      "\\.css$"
    ],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
  };