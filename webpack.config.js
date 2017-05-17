var path = require('path');

module.exports = {
  entry: 'src/app.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.js|jsx$/, loaders: ['babel'] }
    ]
  }
};
