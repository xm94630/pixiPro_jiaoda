const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js'
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

        //这个是对所有页面中都要用到的文件的打包
        // commons: {
        //   name: 'PIXI',
        //   chunks: 'initial',
        //   minChunks: 2
        // }

        //对所有的node_modules中的模块打包
        //这样子做，可能会打包出一个非常大的包，推荐只打包核心的，必要的文件
        //其他的可以动态加载（按需加载）
        // commons: {
        //   test: /[\\/]node_modules[\\/]/,
        //   name: 'vendors',
        //   chunks: 'all'
        // }

        //对特定的node_modules中的模块打包
        vendor: {
          test: /[\\/]node_modules[\\/](PIXI|lodash)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        }

      }
    }
  }
};