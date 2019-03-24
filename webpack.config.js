const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  devtool: `source-map`,
  devServer: {
    contentBase: `./public`,
  },

  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname, `public`),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[path][name].[ext]`,
              emitFile: true,
            },
          },
        ],
      },
    ],
  },
};
