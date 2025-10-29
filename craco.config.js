const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the existing TypeScript rule and modify it or add a new one
      const tsRule = webpackConfig.module.rules.find(rule =>
        Array.isArray(rule.test) ? rule.test.some(t => t.test('.ts')) : rule.test.test('.ts')
      );

      if (tsRule) {
        // Assuming tsRule.use is an array of loaders
        const babelLoader = tsRule.use && tsRule.use.find(loader => loader.loader && loader.loader.includes('babel-loader'));
        if (babelLoader) {
          babelLoader.options.plugins = babelLoader.options.plugins || [];
          babelLoader.options.plugins.push(require.resolve('@babel/plugin-transform-typescript'));
        } else {
          // If no babel-loader found in existing rule, add a new one
          webpackConfig.module.rules.push({
            test: /\.(ts|tsx)$/,
            loader: require.resolve('babel-loader'),
            options: {
              presets: [require.resolve('babel-preset-react-app')],
              plugins: [
                require.resolve('@babel/plugin-transform-typescript'),
              ],
            },
          });
        }
      } else {
        // If no existing TypeScript rule, add a new one
        webpackConfig.module.rules.push({
          test: /\.(ts|tsx)$/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('babel-preset-react-app')],
            plugins: [
              require.resolve('@babel/plugin-transform-typescript'),
            ],
          },
        });
      }

      webpackConfig.plugins.push(
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
        })
      );

      return webpackConfig;
    },
  },
};