module.exports = {
  entry: {
    index: "./src/index.js",
    styled: "./src/styled.js",
    cssvars: "./src/cssvars.js",
    themedcss: "./src/themedcss.js",
    plaincss: "./src/plaincss.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + '/public/dist',
  },
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
}
