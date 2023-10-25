module.exports = {
  preset: 'react-native',
  coveragePathIgnorePatterns: ['jest-setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/example/'],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)"
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testRegex: '/__tests__/.*\\.(step|test|spec)\\.(cjs|js|tsx?)$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(cjs|js|ts|tsx)$': 'babel-jest',
  },
  setupFiles: [
    "<rootDir>/jest-cucumber-config.js",
    "<rootDir>/jest.setup.js"
  ],
  setupfilesafterenv: ['<rootdir>/jest-after.js']
};
