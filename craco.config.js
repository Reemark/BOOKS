const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // ----------------- Plugin DefinePlugin pour __DEV__ -----------------
      webpackConfig.plugins = webpackConfig.plugins || [];
      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
        })
      );

      // ----------------- SetupMiddlewares pour éviter les warnings -----------------
      webpackConfig.devServer = webpackConfig.devServer || {};
      webpackConfig.devServer.setupMiddlewares = (middlewares, devServer) => {
        console.log('Webpack Dev Server middlewares configurés.');
        // Vous pouvez ajouter ici vos middlewares personnalisés si nécessaire
        return middlewares;
      };

      return webpackConfig;
    },
  },
};
