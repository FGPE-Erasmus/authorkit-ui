const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        publicPath: process.env.VUE_APP_PUBLIC_PATH,
        features: ["!gotoSymbol"]
      })
    ]
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "i18n",
      enableInSFC: true
    }
  }
};
