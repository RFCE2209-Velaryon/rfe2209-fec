//setting up environment for jest
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif)$": "<rootDir>/__mocks__/fileMock.js",
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!(axios)/)']
}