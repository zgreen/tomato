module.exports = {
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/components$1",
  },
  setupFilesAfterEnv: ["./.jest/setup.js"],
};
