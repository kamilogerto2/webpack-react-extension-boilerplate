const { getHTMLPlugins, getOutput, getCopyPlugins, getFirefoxCopyPlugins } = require('./webpack.utils');
const path = require('path');

const generalConfig = {
  mode: 'development',
  entry: {
    popup: path.resolve(__dirname, 'src/popup/popup.jsx'),
    options: path.resolve(__dirname, 'src/options/options.jsx'),
    content: path.resolve(__dirname, 'src/content/content.js'),
    background: path.resolve(__dirname, 'src/background/background.js'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
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
    ],
  },
};

module.exports = [
  {
    ...generalConfig,
    output: getOutput('chrome'),
    plugins: [
      ...getHTMLPlugins('chrome'),
      ...getCopyPlugins('chrome'),
    ],
  },
  {
    ...generalConfig,
    output: getOutput('opera'),
    plugins: [
      ...getHTMLPlugins('opera'),
      ...getCopyPlugins('opera'),
    ],
  },
  {
    ...generalConfig,
    output: getOutput('firefox'),
    plugins: [
      ...getHTMLPlugins('firefox'),
      ...getFirefoxCopyPlugins('firefox'),
    ],
  },
];
