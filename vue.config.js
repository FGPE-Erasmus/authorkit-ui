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
  }
};
