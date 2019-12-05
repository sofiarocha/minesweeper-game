const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs"); // to check if the file exists

module.exports = env => {
  // handle .env:
  const currentPath = path.join(__dirname);

  const basePath = `${currentPath}/.env`;
  const envPath = `${basePath}.${env.ENVIRONMENT}`;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    const prevKey = { ...prev };
    prevKey[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prevKey;
  }, {});

  return {
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
      publicPath: fileEnv.HOME_URL
    },
    devServer: {
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "!!html-loader!index.html"
      }),
      new webpack.DefinePlugin({ ...envKeys, hello: "there" })
    ],
    devtool: "sourcemap",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.html$/,
          loader: "html-loader"
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    }
  };
};
