'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

require('dotenv').config({
  path: path.resolve(__dirname, './.env')
})

module.exports = (env, argv) => {
  const isProd = argv && argv.mode === 'production'

  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      main: [
        './src/main.js',
        './src/styles/index.scss'
      ],
      background: './src/scripts/background.js'
    },
    devtool: isProd ? false : 'source-map',
    output: {
      filename: 'static/[name].js',
      chunkFilename: 'static/chunks/[name].[hash].js',
      publicPath: '/',
      path: path.resolve(__dirname, './dist')
    },
    devServer: {
      publicPath: '/',
      contentBase: './dist',
      clientLogLevel: 'error',
      disableHostCheck: true,
      writeToDisk: true
    },
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProd
              }
            },
            'css-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static/images'
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'static/files'
              }
            }
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            'babel-loader',
            'eslint-loader'
          ]
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([
        'public'
      ]),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.ejs',
        inject: true,
        chunks: ['main'],
        meta: {
          description: 'Create an automatic portfolio based on Github and other various data',
          viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        },
        minify: isProd ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        } : false,
        chunksSortMode: 'none'
      }),
      new MiniCssExtractPlugin({
        filename: 'static/[name].css',
        chunkFilename: 'static/css/[name].[hash].css'
      })
    ],
    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, './src/')
      }
    }
  }
}
