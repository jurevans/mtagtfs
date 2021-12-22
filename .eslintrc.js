module.exports = {
  root: true,
  extends: ['@react-native-community'],
  rules: {
    'prettier/prettier': 0,
    'no-shadow': [
      'error',
      { builtinGlobals: true, hoist: 'functions', allow: ['tripId'] },
    ],
  },
  plugins: ['prettier'],
};
