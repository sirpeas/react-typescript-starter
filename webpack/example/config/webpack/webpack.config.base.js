const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const srcPath = path.join(__dirname, '..', '..', 'src');

module.exports = {
  target: 'web',
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, '..', '..', 'tsconfig.json'),
      }),
    ]
  },
  entry: {
    app: path.join(srcPath, 'index.tsx'),
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.join(srcPath, '..', 'dist'),
    publicPath: '/',
    filename: '[name]-[hash:8].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new CleanWebpackPlugin(
      ['dist'],
      {
        root: path.join(srcPath, '..'),
        exclude: 'uploads',
      },
    ),
    new MiniCSSExtractPlugin({
      filename: '[name]-[hash:8].css',
      chunkFilename: '[id]-[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      inject: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?)|(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCSSExtractPlugin.loader,
          'css-loader',
        ],
      }, {
        test: /\.(jpe?g|png|svg|ico)/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      }, {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
