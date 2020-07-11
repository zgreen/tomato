module.exports = {
  moduleNameMapper: {
    "^@/components(.*)$": "<rootDir>/components$1",
    "^@/contexts(.*)$": "<rootDir>/contexts$1",
    "^@/hooks(.*)$": "<rootDir>/hooks$1",
  },
  setupFilesAfterEnv: ["./.jest/setup.js"],
};
