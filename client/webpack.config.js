const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode:"production",
  plugins: [
    new HtmlWebpackPlugin({
      title: '新交大群侠传',
      template: 'index.html'
    })
  ]
};