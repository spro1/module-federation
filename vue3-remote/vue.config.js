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
    port: 8002,
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
        vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm-bundler.js'),
      },
    },
    experiments: {
      topLevelAwait: true
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "remote3vue",
        filename: "remoteEntry.js",
        exposes: {
          "./HelloWorld": "./src/components/HelloWorld.vue",
          "./TestComposition": "./src/components/TestComposition.vue",
          "./TestCompositionJS": "./src/module/TestComposition.js",
          "./TestOption": "./src/components/TestOption.vue",
          "./TestOptionJS": "./src/module/TestOption.js",

        },
        shared: {
          'vue3': {
            import: 'vue',
            shareKey: 'shared-vue',
            shareScope: 'default',
            eager: true,
            requiredVersion: '^3.2.13',
          },
        },
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