const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.ts",
    map: "./src/map.ts",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "dist",
  },
  devServer: {
    publicPath: "/dist/",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
