const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { HotModuleReplacementPlugin } = require("webpack");
const { join } = require("path");

module.exports = {
  entry: join(__dirname, "/client/src/index.js"),
  output: {
    path: join(__dirname, "/client/build"),
    filename: "app.min.js",
  },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      { test: /\.vue$/, use: "vue-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.sass$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                indentedSyntax: true,
              },
              additionalData: '@import "/client/src/helpers/variables.sass"',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      showErrors: true,
      cache: true,
      template: join(__dirname, "/client/src/index.html"),
      favicon: join(__dirname, "/client/src/assets/horterFavicon.png"),
    }),
    new VueLoaderPlugin(),
  ],
};
