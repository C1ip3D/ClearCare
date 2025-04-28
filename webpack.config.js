import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPageNames = ['about'];
const multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: `./src/pages/${name}.html`,
    filename: `${name}.html`,
    chunks: [`${name}`],
    inject: true,
  });
});

export default {
  entry: {
    index: ['./src/scripts/index.js', './src/css/index.scss'],
    ...(fs.existsSync('./src/scripts/about.js') && {
      about: ['./src/scripts/about.js', './src/css/about.scss'],
    }),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src/css')],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
      chunks: ['index'],
    }),
  ].concat(multipleHtmlPlugins),
  mode: 'development',
  resolve: {
    extensions: ['.js', '.sass', '.scss', '.css'],
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
};
