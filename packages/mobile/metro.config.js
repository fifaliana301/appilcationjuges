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
      // getTransformOptions: async () => ({
      //   transform: {
      //     experimentalImportSupport: false,
      //     inlineRequires: false,
      //   },
      // }),
    },
    // 1. Watch all files within the monorepo
    watchFolders: [workspaceRoot],
    resolver: {
      resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],
      // // 2. Let Metro know where to resolve packages and in what order
      nodeModulesPaths: [
        path.resolve(__dirname, "node_modules"),
        path.resolve(workspaceRoot, "node_modules"),
      ],
      
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg', 'jsx'],
    },

    // server: {
    //   enhanceMiddleware: (middleware) => {
    //     return (req, res, next) => {
    //       const assetsPath = "/story/";
    //       const modifiedAssetsPath = "/assets/../../node_modules/@bboy-app/story/";
    //
    //       if (req.url.startsWith(assetsPath)) {
    //         req.url = req.url.replace(assetsPath, modifiedAssetsPath);
    //       }
    //
    //       return middleware(req, res, next);
    //     };
    //   }
    // }
  };
})();
