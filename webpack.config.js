const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: "@sucrase/webpack-loader",
          options: {
            transforms: ["jsx"],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    },
  },
  plugins: [
    new HTMLWebpackPlugin({ template: "src/layout.ejs" })
  ],
  devServer: {
    historyApiFallback: true,
  }
}
