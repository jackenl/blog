const path = require('path');

module.exports = {
  entry: './src/examples/module/async-import/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: false,
  mode: 'development',
};
