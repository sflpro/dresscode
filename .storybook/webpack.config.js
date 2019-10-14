const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, '../src'),
        exclude: /node_modules/,
        loader: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      { test: /\.icon\.svg$/, loader: 'inline-loader' },
      {
        test: /((^(?!.*\.icon\.svg).*svg.*$)|(\.(png|jpg|gif|woff|woff2|eot|ttf|otf|txt)$))/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: path.resolve(__dirname, 'src'),
          },
        }],
      },
    ],
  },
};
