
const StyleLintPlugin = require('stylelint-webpack-plugin');
const packageJSON = require('./package.json');
const path = require('path');

const DIST = path.resolve("./dist");
const MODE = process.env.NODE_ENV || 'development';

console.log('Webpack mode:', MODE); // eslint-disable-line no-console

const config = {
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  mode: MODE,
  output: {
    filename: `${packageJSON.name}.js`,
    libraryTarget: 'amd',
    path: DIST
  },
  externals: {
    jquery: {
      amd: 'jquery',
      commonjs: 'jquery',
      commonjs2: 'jquery',
      root: '_'
    },
    qlik: {
      amd: 'qlik',
      commonjs: 'qlik',
      commonjs2: 'qlik',
      root: '_'
    },
    qvangular: {
      amd: 'qvangular',
      commonjs: 'qvangular',
      commonjs2: 'qvangular',
      root: '_'
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /(node_modules|Library)/,
        loader: "eslint-loader",
        options: {
          failOnError: true
        }
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.(less|css)$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new StyleLintPlugin()
  ]
};

module.exports = config;
