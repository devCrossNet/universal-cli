const CompressionPlugin = require('compression-webpack-plugin');

export const getConfig = function (options: any) {
  if (options.buildOptions.environment === 'dev') {
    return {};
  } else {
    return {
      plugins: [
        new CompressionPlugin({
          asset: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|html)$/,
          threshold: 0,
          minRatio: 1
        })
      ]
    };
  }
};
