module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-shadow': [
      'error',
      { builtinGlobals: true, hoist: 'functions', allow: ['tripId'] },
    ],
  },
  plugins: ['prettier'],
};
