const { getHTMLPlugins, getOutput, getCopyPlugins, getFirefoxCopyPlugins, getEntry } = require('./webpack.utils');

const generalConfig = {
  mode: 'development',
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
    entry: getEntry(),
    output: getOutput('chrome'),
    plugins: [
      ...getHTMLPlugins('chrome'),
      ...getCopyPlugins('chrome'),
    ],
  },
  {
    ...generalConfig,
    entry: getEntry(),
    output: getOutput('opera'),
    plugins: [
      ...getHTMLPlugins('opera'),
      ...getCopyPlugins('opera'),
    ],
  },
  {
    ...generalConfig,
    entry: getEntry(),
    output: getOutput('firefox'),
    plugins: [
      ...getHTMLPlugins('firefox'),
      ...getFirefoxCopyPlugins('firefox'),
    ],
  },
];
