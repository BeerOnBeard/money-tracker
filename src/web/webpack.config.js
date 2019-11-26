const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'app.css', to: 'dist/app.css' }
    ])
  ],
  devServer: {
    proxy: {
      '/transactions': 'http://localhost:3000'
    }
  }
};
