const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  devtool: 'eval-cheap-module-source-map',

  entry: {
    index: './src/js/app.js'
  },

  devServer: {
    port: 8080,
    writeToDisk: false
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/html/template.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  output: {
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),
              sassOptions: {
                includePaths: ['./node_modules'],
              }
            },
          }
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        },
      }
    ],
  },
};
