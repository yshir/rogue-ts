// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import('webpack').Configuration} */
const config = {
  entry: './src/game.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      {
        test: /phaser\.js$/,
        loader: 'expose-loader',
        options: {
          exposes: ['phaser'],
        },
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/dist/',
    host: '127.0.0.1',
    port: 8080,
    open: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: path.join(__dirname, '/node_modules/phaser/dist/phaser.js'),
    },
  },
};

module.exports = config;
