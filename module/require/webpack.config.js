const path = require('path');

module.exports = {
  entry: './examples/require/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: false,
  mode: 'development',
};