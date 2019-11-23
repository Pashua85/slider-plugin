module.exports = function() {
  return {
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'ts-loader',  
        },
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    }
  };
};