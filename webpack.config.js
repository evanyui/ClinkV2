var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry  : {
    client: './src/client.js'
  },
  output : {
    filename: '[name].js',
    path    : `${__dirname}/public`
  },
  module : {
    rules: [
      {
        test   : /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions      : ['.js', '.jsx'],
    moduleExtensions: ['node_modules']
  },
  devServer: {
    contentBase: `${__dirname}/public`,
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Clink',
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}

