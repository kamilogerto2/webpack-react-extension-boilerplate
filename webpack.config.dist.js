const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { getHTMLPlugins, getOutput, getCopyPlugins, getZipPlugin, getFirefoxCopyPlugins } = require('./webpack.utils');
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
    output: getOutput('chrome'),
    plugins: [
      new UglifyJsPlugin(),
      ...getHTMLPlugins('chrome'),
      ...getCopyPlugins('chrome'),
      getZipPlugin('chrome')
    ]
  },
  {
    ...generalConfig,
    output: getOutput('opera'),
    plugins: [
      new UglifyJsPlugin(),
      ...getHTMLPlugins('opera'),
      ...getCopyPlugins('opera'),
      getZipPlugin('opera')
    ]
  },
  {
    ...generalConfig,
    output: getOutput('firefox'),
    plugins: [
      new UglifyJsPlugin(),
      ...getHTMLPlugins('firefox'),
      ...getFirefoxCopyPlugins('firefox'),
      getZipPlugin('firefox')
    ]
  },
];
