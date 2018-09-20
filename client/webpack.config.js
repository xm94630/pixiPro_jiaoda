const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    //polyfill:'babel-polyfill',  //如果要使用es7\es8这种，需要有这个
    main: './src/js/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode:"production",

  //这个部分可以不写，默认就是这个
  devServer: {
    port: 9000,
    host: '0.0.0.0',

    //回到整个项目的根目录下，默认访问的是我的项目首页（不管是不是以index.html命名）
    //这样子设置方便访问demo文件夹中的参考demo
    contentBase: path.resolve(__dirname, '../'), 
  },

  //有了这个，如果页面中有js错误，可以有定位。
  //devtool: 'inline-source-map', 
  
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: '新交大群侠传',
      template: './src/game.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].bundle.css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].bundle.css' : '[id].[hash].css',
    }),
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

  
  ,module: {
    rules: [
      //{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            //这里相当于之前的.babelrc 文件的配置，放到这里也行
            presets: ['@babel/preset-env'],
            //plugins: ["syntax-async-functions"] //使用这个es8的，不仅要有该插件，还需要有 babel-polyfill.
          }
        }
      },
      


      {
        test: /\.(le|c)ss$/,
        use: [
          //根据环境选择，前者会打包到js，后者是单独的文件
          //devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          MiniCssExtractPlugin.loader, //这里采用单独文件的形式
          'css-loader',
          'less-loader',
        ],
      }

      
    ]
  }

};