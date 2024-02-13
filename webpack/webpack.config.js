// Libraries
const path = require('path')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const globImporter = require('node-sass-glob-importer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlBeautifyPlugin = require('beautify-html-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

// Files
const utils = require('./utils')

// Configuration
module.exports = (env) => {
  return {
    context: path.resolve(__dirname, '../src'),
    entry: {
      app: './app.js',
    },
    output: {
      path: path.resolve(__dirname, '../public/dist'),
      filename: 'assets/[name].js',
      assetModuleFilename: 'assets/fonts/[name][ext]',
      clean: true,
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, '../src'),
      },
      open: ['/index'],
    },
    devtool: env.NODE_ENV === 'development' ? 'source-map' : false,
    resolve: {
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      extensions: ['.js', '.css', '.scss'],
    },

    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    /*
      Loaders with configurations
    */
    module: {
      rules: [
        {
          test: /\.(js|ts)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-typescript'],
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            env.NODE_ENV === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            env.NODE_ENV === 'development'
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 1, sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  importer: globImporter(),
                },
                webpackImporter: true,
              },
            },
          ],
        },
        {
          test: /\.pug$/,
          loader: '@webdiscus/pug-loader',
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset',
        },
        {
          test: /\.woff2?$/i,
          type: 'asset/resource',
        },
        {
          test: /\.mp4$/i,
          type: 'asset/resource',
        },
      ],
    },
    optimization: {
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['mozjpeg', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
              ],
            },
          },
          generator: [
            {
              preset: 'webp',
              implementation: ImageMinimizerPlugin.imageminGenerate,
              options: {
                plugins: ['imagemin-webp'],
              },
            },
          ],
        }),
        new TerserPlugin(),
      ],

      splitChunks: {
        cacheGroups: {
          default: false,
          vendors: false,
          // vendor chunk
          vendor: {
            filename: 'assets/vendor.js',
            // sync + async chunks
            chunks: 'all',
            // import file path containing node_modules
            test: /node_modules/,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },

    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'assets/images', to: 'assets/images' },
          // { from: 'assets/fonts', to: 'assets/fonts' },
          { from: 'assets/videos', to: 'assets/videos' },
          // { from: 'assets/animations', to: 'assets/animations' },
        ],
      }),

      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: 'vendors.css',
      }),

      /*
        Pages
      */
      ...utils.pages(env.NODE_ENV),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery',
      }),

      new HtmlBeautifyPlugin({
        end_with_newline: true,
        indent_size: 2,
        indent_with_tabs: true,
        indent_inner_html: true,
        preserve_newlines: true,
      }),

      new WebpackNotifierPlugin({
        title: 'Bundler',
      }),
    ],
  }
}
