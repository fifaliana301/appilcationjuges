/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path')
const { getDefaultConfig } = require('metro-config');

const workspaceRoot = path.resolve(__dirname, "../../");
console.info('CONFIG', [workspaceRoot])

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    watchFolders: [
      workspaceRoot,
    ],
    resolver: {
      resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
