import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { register } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pageNames = ['login', 'register', 'forgot-password'];

function generateEntries() {
  const baseEntry = {
    index: ['./src/scripts/index.js', './src/css/index.scss'],
  };

  const additionalEntries = pageNames.reduce((entries, name) => {
    if (fs.existsSync(`./src/scripts/${name}.js`)) {
      entries[name] = [`./src/scripts/${name}.js`, `./src/css/${name}.scss`];
    }
    return entries;
  }, {});

  return { ...baseEntry, ...additionalEntries };
}

const multipleHtmlPlugins = pageNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: `./src/pages/${name}.html`,
    filename: `${name}.html`,
    chunks: [`${name}`],
    inject: true,
  });
});

export default {
  entry: generateEntries(),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: './',
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
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
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
      filename: '[name].css',
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
