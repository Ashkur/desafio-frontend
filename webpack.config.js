const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const webpack = require("webpack");

require("babel-polyfill");

new webpack.HotModuleReplacementPlugin(),
  (module.exports = {
    entry: ["babel-polyfill", "./src/main.js"],
    module: {
      rules: [
        { test: /\.js$/, use: "babel-loader" },
        { test: /\.vue$/, use: "vue-loader" },
        { test: /\.css$/, use: ["vue-style-loader", "css-loader"] }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      }),
      new VueLoaderPlugin()
    ]
  });
