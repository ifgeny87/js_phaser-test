const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const idProd = env === 'production';

module.exports = {
  mode: env,
  devtool: isDev ? 'source-map' : false,
  entry: {
    starfail: './src/games/starfail/starfail.js',
  },
  output: {
    filename: 'bundle.[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      src: './src',
    },
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.pug$/,
        use: ['pug-loader'],
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: './src/assets',
        to: './assets',
      },
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      favicon: '',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      inject: false,
      minify: {
        collapseWhitespace: false,
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/games/starfail/starfail.pug',
      filename: 'starfail.html',
      favicon: '',
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      chunks: ['starfail'],
      minify: {
        collapseWhitespace: false,
      },
    }),
  ],
};
