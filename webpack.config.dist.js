const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { getHTMLPlugins, getOutput, getCopyPlugins, getZipPlugin, getFirefoxCopyPlugins, getEntry } = require('./webpack.utils');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const generalConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        query: {
          presets: ['@babel/preset-env','@babel/preset-react'],
        },
        resolve: {
          extensions: ['.js', '.jsx'],
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};

module.exports = [
  {
    ...generalConfig,
    output: getOutput('chrome', 'temp'),
    entry: getEntry(),
    plugins: [
      new UglifyJsPlugin(),
      ...getHTMLPlugins('chrome', 'temp'),
      ...getCopyPlugins('chrome', 'temp'),
      getZipPlugin('chrome', 'dist'),
    ],
  },
  {
    ...generalConfig,
    output: getOutput('opera', 'temp'),
    entry: getEntry(),
    plugins: [
      new UglifyJsPlugin(),
      ...getHTMLPlugins('opera', 'temp'),
      ...getCopyPlugins('opera', 'temp'),
      getZipPlugin('opera', 'dist'),
    ],
  },
  {
    ...generalConfig,
    entry: getEntry(),
    output: getOutput('firefox', 'temp'),
    plugins: [
      new UglifyJsPlugin(),
      ...getHTMLPlugins('firefox', 'temp'),
      ...getFirefoxCopyPlugins('firefox', 'temp'),
      getZipPlugin('firefox', 'dist'),
    ],
  },
];
