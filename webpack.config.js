const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-cheap-module-source-map',

  entry: ['./src/scss/app.scss', './src/js/app.js'],

  devServer: {
    port: 8080,
    writeToDisk: false
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/template.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    })
  ],

  output: {
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
               plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            },
          }
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      }
    ],
  },
};
