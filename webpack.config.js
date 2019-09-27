const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    terminal: './index.js',
    admin: './react-admin/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};
