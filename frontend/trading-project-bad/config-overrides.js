const { override, addLessLoader } = require('customize-cra');

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
    },
    sourceMap: true, // Enable if you need source maps
  }),
  (config) => {
    const postcssLoader = config.module.rules
      .find(rule => Array.isArray(rule.oneOf))
      .oneOf.find(
        rule => rule.loader && rule.loader.includes('postcss-loader')
      );

    if (postcssLoader) {
      postcssLoader.options = {
        postcssOptions: {
          plugins: [
            require('autoprefixer')(),
            // Add other PostCSS plugins here if needed
          ],
        },
        sourceMap: true, // Enable if you need source maps for PostCSS
      };
    }

    return config;
  }
);
