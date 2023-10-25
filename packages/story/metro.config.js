/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
// const path = require('path');
//
// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: true,
//       },
//     }),
//   },
//   watchFolders: [
//     path.resolve(__dirname, '../../node_modules'),
//     path.resolve(__dirname, '../../node_modules/@example-app/shared'),
//   ],
// };

const path = require('path')

const linkedLibs = [path.resolve(__dirname, '../..')]
console.info('CONFIG', linkedLibs) 
 
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  watchFolders: linkedLibs,
  resolver: {
    resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
  },
};

