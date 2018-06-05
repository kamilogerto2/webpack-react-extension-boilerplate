const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const path = require('path');

const getHTMLPlugins = (browserDir, outputDir = 'dev') => [
  new HtmlWebpackPlugin({
    title: 'Popup',
    filename: path.resolve(__dirname, `${outputDir}/${browserDir}/popup/index.html`),
    template: 'src/popup/index.html',
    chunks: ['popup']
  }),
  new HtmlWebpackPlugin({
    title: 'Options',
    filename: path.resolve(__dirname, `${outputDir}/${browserDir}/options/index.html`),
    template: 'src/options/index.html',
    chunks: ['options']
  }),
];

const getOutput = (browserDir, outputDir = 'dev') => {
  return {
    path: path.resolve(__dirname, `${outputDir}/${browserDir}`),
    filename: '[name]/[name].js'
  }
};

const getCopyPlugins = (browserDir, outputDir = 'dev') => [
  new CopyWebpackPlugin([
    {from: 'src/assets', to: path.resolve(__dirname, `${outputDir}/${browserDir}/assets`)},
    {from: 'src/_locales', to: path.resolve(__dirname, `${outputDir}/${browserDir}/_locales`)},
    {from: 'src/manifest.json', to: path.resolve(__dirname, `${outputDir}/${browserDir}/manifest.json`)},
  ]),
];

const getFirefoxCopyPlugins = (browserDir, outputDir = 'dev') => [
  new CopyWebpackPlugin([
    {from: 'src/assets', to: path.resolve(__dirname, `${outputDir}/${browserDir}/assets`)},
    {from: 'src/_locales', to: path.resolve(__dirname, `${outputDir}/${browserDir}/_locales`)},
  ]),
  new MergeJsonWebpackPlugin({
    files: [
      'src/manifest.json',
      'src/manifest-ff.json',
    ],
    output: {
      fileName: path.resolve(__dirname, `${outputDir}/${browserDir}/manifest.json`)
    }
  })
]

const getZipPlugin = (browserDir, outputDir = 'dist') =>
  new ZipPlugin({
    path: path.resolve(__dirname, `${outputDir}/${browserDir}`),
    filename: browserDir,
    extension: 'zip',
    fileOptions: {
      mtime: new Date(),
      mode: 0o100664,
      compress: true,
      forceZip64Format: false,
    },
    zipOptions: {
      forceZip64Format: false,
    },
  });

module.exports = {
  getHTMLPlugins,
  getOutput,
  getCopyPlugins,
  getFirefoxCopyPlugins,
  getZipPlugin
};
