const path = require('path');
module.exports = {
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      loader: 'babel-loader',
     
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css']
  },
  devServer: {
    publicPath: path.join('/dist/')
  }
};