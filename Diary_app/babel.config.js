require('@babel/register')({
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  // ignore: [/node_modules/],
  // only: [/src/]
});
module.exports = {
  presets: ['module:metro-react-native-babel-preset', 
  ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript'],
  plugins: ["babel-plugin-styled-components",
  "@babel/plugin-transform-modules-commonjs"]
};
