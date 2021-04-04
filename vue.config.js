const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  chainWebpack: (config) => {
    config.plugin('stylelint').use(StylelintPlugin, [
      {
        files: ['src/**/*.{css,less,sass,scss,vue}'],
        fix: true,
      },
    ]);
    config.when(process.env.NODE_ENV === 'production', (config_) => {
      config_.optimization.minimizer('terser').tap((args) => {
        args[0].terserOptions.compress.drop_console = true;
        return args;
      });
    });
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/variables.scss";',
      },
    },
  },
  devServer: {
    proxy: process.env.VUE_APP_REQUEST_BASE_URL || 'https://fake.url',
  },
  pluginOptions: {
    i18n: {
      locale: process.env.VUE_APP_I18N_LOCALE || 'zh-Hans',
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh-Hans',
      localeDir: 'i18n/locales',
      enableInSFC: false,
    },
  },
};
