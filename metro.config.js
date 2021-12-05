// SEE: https://github.com/apollographql/apollo-client/releases/tag/v3.5.4
// SEE: https://bestofreactjs.com/repo/kristerkari-react-native-svg-transformer-react-react-native-awesome-components
const { getDefaultConfig } = require('metro-config');
module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname);
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg', 'cjs'],
    },
  };
})();
