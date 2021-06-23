const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: (config) => {
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: "vue-svg-loader",
        },
      ],
    },
    resolve: {
      alias: {
        "@c": path.resolve(__dirname, "/src/components"),
        "@a": path.resolve(__dirname, "/src/assets"),
        "@v": path.resolve(__dirname, "/src/views"),
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/_variables.scss";`,
      },
    },
  },
};
