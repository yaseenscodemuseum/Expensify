const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production", // Change to production for optimized builds
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"), // Change "dist" to "build"
    filename: "bundle.js",
  },  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    static: path.join(__dirname, "build"), // Change "dist" to "build"
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};
