const path = require('path');

const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const idProd = env === 'production';

module.exports = {
  mode: env,
  devtool: isDev ? 'source-map' : false,
  entry: {
    app: [ './src/app.js' ],
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
      }
    ]
  },
  plugins: [],
};
