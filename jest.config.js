module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "@swc/jest",
    },
    transformIgnorePatterns: [
      "node_modules/(?!(your-module|another-module)/)"
    ],
  };