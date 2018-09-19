const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    PIXI: ['PIXI'],
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode:"production",

  //这个部分可以不写，默认就是这个
  devServer: {
    contentBase: './dist'   
  },

  //有了这个，如果页面中有js错误，可以有定位。
  //devtool: 'inline-source-map', 
  
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '新交大群侠传',
      template: './src/index.html'
    })
  ]
  
  //分开打包
  ,optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'PIXI',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
};