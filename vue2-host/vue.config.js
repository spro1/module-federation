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
    port: 8000,
    allowedHosts: "all",
    hot: false,
    liveReload: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  configureWebpack: {
    cache: false,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        //vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js'),
      },
    },
    experiments: {
      topLevelAwait: true
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "host2Vue",
        remotes: {
          remote2vue: "remote2vue@http://localhost:8001/remoteEntry.js",
          remote3vue: "remote3vue@http://localhost:8002/remoteEntry.js",
        },
        shared: ['vue3','shared-vue']
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