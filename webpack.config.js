const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

// needed so that baseUrl in tsconfig.json is used to determine whereabouts of modules
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  context: __dirname,
  // mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  mode: 'production',
  entry: slsw.lib.entries,
  devtool: 'nosources-source-map',
  resolve: {
    // important - this needs to include extensions of files of referenced bundles in node_modules
    extensions: ['.mjs', '.json', '.ts', '.js'],
    symlinks: false,
    cacheWithContext: false,
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  // need to exclude aws-sdk as it is transitively included by lambda-api which is under dependencies not devDependencies
  externals: ['source-map-support/register', 'aws-sdk'], // [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ]
      },
    ],
  },
  plugins: [
    //  new WebpackBundleAnalyzer()
    // new ForkTsCheckerWebpackPlugin({
    //   eslint: true,
    //   eslintOptions: {
    //     cache: true
    //   }
    // })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        extractComments: false,
        terserOptions: {
          mangle: true,
          keep_classnames: true,
          output: {
            comments: false
          }
        },
      })      
     ]
  }
};
