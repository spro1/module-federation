const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  publicPath: "auto",
  transpileDependencies: true,
  lintOnSave: false,
  pages: {
    index: {
      entry: "./src/main.js"
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 8001,
    allowedHosts: "all",
    hot: false,
    liveReload: true,
    historyApiFallback: true
  },
  configureWebpack: {
    cache: false,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js'),
      },
    },
    experiments: {
      topLevelAwait: true
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "remote2vue",
        filename: "remoteEntry.js",
        exposes: {
          "./HelloWorld": "./src/components/HelloWorld.vue",
          "./TestCom": "./src/components/TestCom.vue",
        },
        shared: {}
      })
    ]
  },
  chainWebpack: config => {
    config.optimization.delete("splitChunks");
    config.module
        .rule("vue")
        .use("vue-loader")
        .tap(options => {
          options.compilerOptions = {
            ...options.compilerOptions,
            compiler: true
          };
          return options;
        });
  }
};