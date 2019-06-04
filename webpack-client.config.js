const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function() {
  return {
    entry: './client/src/index.js',
    output: {
      path: path.join(__dirname, '/server/build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|jp(e*)g|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name]-[hash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name]-[hash].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          exclude: /(src)/,
          use: [
            {
              loader: 'svg-inline-loader',
              options: {
                name: '[name]-[hash].[ext]',
                outputPath: 'svg/',
              },
            },
          ],
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, './public', 'index.html'),
        filename: 'index.html',
      }),
    ],
    stats: {
      colors: true,
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        Components: path.resolve(__dirname, 'src/components'),
        Utils: path.resolve(__dirname, 'src/utils'),
        Assets: path.resolve(__dirname, 'src/assets'),
      }
    },
    devtool: 'source-map',
    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, './public'),
      compress: true,
      port: 8080,
      watchContentBase: true,
      progress: true,
    },
  };
};
