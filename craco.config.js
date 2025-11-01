const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // ----------------- Gestion TypeScript avec Babel -----------------
      const tsRule = webpackConfig.module.rules.find(rule =>
        rule.test && (rule.test instanceof RegExp ? rule.test.test('.ts') :
        Array.isArray(rule.test) && rule.test.some(t => t instanceof RegExp && t.test('.ts')))
      );

      if (tsRule) {
        const babelLoader = tsRule.use && tsRule.use.find(loader => loader.loader && loader.loader.includes('babel-loader'));
        if (babelLoader) {
          babelLoader.options = babelLoader.options || {};
          babelLoader.options.plugins = babelLoader.options.plugins || [];
          babelLoader.options.plugins.push(require.resolve('@babel/plugin-transform-typescript'));
        } else {
          webpackConfig.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
              presets: [require.resolve('babel-preset-react-app')],
              plugins: [require.resolve('@babel/plugin-transform-typescript')],
            },
          });
        }
      } else {
        webpackConfig.module.rules.push({
          test: /\.(ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('babel-preset-react-app')],
            plugins: [require.resolve('@babel/plugin-transform-typescript')],
          },
        });
      }

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
