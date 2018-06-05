const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { getHTMLPlugins, getOutput, getCopyPlugins, getZipPlugin, getFirefoxCopyPlugins } = require('./webpack.utils');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const path = require('path');

const generalConfig = {
  mode: 'production',
  entry: {
    "popup": path.resolve(__dirname, "src/popup/popup.jsx"),
    "options": path.resolve(__dirname, "src/options/options.jsx"),
    "content": path.resolve(__dirname, "src/content/content.js"),
    "background": path.resolve(__dirname, "src/background/background.js")
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        query: {
          presets: ['@babel/preset-env','@babel/preset-react'],
        },
      },
    ]
  },
};

module.exports = [
  {
    ...generalConfig,
    output: getOutput('chrome', 'temp'),
    plugins: [
      new CleanWebpackPlugin(['dist', 'temp']),
      new UglifyJsPlugin(),
      ...getHTMLPlugins('chrome', 'temp'),
      ...getCopyPlugins('chrome', 'temp'),
      getZipPlugin('chrome', 'dist')
    ]
  },
  {
    ...generalConfig,
    output: getOutput('opera', 'temp'),
    plugins: [
      new CleanWebpackPlugin(['dist', 'temp']),
      new UglifyJsPlugin(),
      ...getHTMLPlugins('opera', 'temp'),
      ...getCopyPlugins('opera', 'temp'),
      getZipPlugin('opera', 'dist')
    ]
  },
  {
    ...generalConfig,
    output: getOutput('firefox', 'temp'),
    plugins: [
      new CleanWebpackPlugin(['dist', 'temp']),
      new UglifyJsPlugin(),
      ...getHTMLPlugins('firefox', 'temp'),
      ...getFirefoxCopyPlugins('firefox', 'temp'),
      getZipPlugin('firefox', 'dist')
    ]
  },
];
