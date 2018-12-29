const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const uglify = require('uglifyjs-webpack-plugin')
// const extractTextPlugin = require('extract-text-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const ZopfliPlugin = require('zopfli-webpack-plugin')

// import path from 'path'
// import webpack from 'webpack'
// import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports = {
  entry: {
    app: ['webpack/hot/dev-server', require.resolve('./src/app.js')],
    vender: ['react'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|jpeg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', 'scss', 'css', 'json'],
  },
  devServer: {
    port: 1234,
    // historyApiFallback: true,
    contentBase: path.join(__dirname, 'build'),
    hot: true,
    inline: true,
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      identifier: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      title: 'React App',
      filename: 'index.html',
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/app.[name].css',
      chunkFilename: 'css/app.[contenthash:12].css',
    }),
    new webpack.DefinePlugin({
      BrowserVersion: '1.2.4',
    }),
    // new webpack.SourceMapDevToolPlugin({
    //   columns: false,
    // }), 已被替代
    // new webpack.optimize.AggressiveSplittingPlugin({
    //   // minSize: 30000,
    //   // maxSize: 50000,
    //   chunkOverhead: 0,
    //   entryChunkMultiplicator: 1,
    // }),
    new webpack.optimize.ModuleConcatenationPlugin(),

    // 生成目标资产
    // new ZopfliPlugin({
    //   asset: '[path].gz[query]',
    //   algorithm: 'zopfli',
    //   test: /\.(js|html)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),

    // 通过这个 打包后的js文件 头部有这个字
    new webpack.BannerPlugin('版权所有哦'),
    // new UglifyJsPlugin(), 在webpack 4中被optimization的minimizer替代
    // 使用和顺序无关的模块命名方式
    // new webpack.NamedModulesPlugin(),
  ],
  optimization: {
    minimizer: [
      new uglify({
        cache: true,
        parallel: true,
        sourceMap: true,
        parallel: true,
      }),
    ],
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        // 将多个css chunk 合并成一个css文件
        styles: {
          name: 'styles',
          test: /\.scss|css/,
          chunks: 'all',
          enforce: true,
        },
        vender: {
          name: 'vender',
          minChunks: Infinity,
        },
      },
    },
    namedModules: true,
  },
  mode: 'development',
}
