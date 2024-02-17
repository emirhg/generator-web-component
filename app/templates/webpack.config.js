const path = require("path");
const PugPlugin = require("pug-plugin");

const isProduction = process.env.NODE_ENV == "production";
const OUTPUT_DIR = "dist";

const sourcePath = path.join(__dirname, `${sourcePath}/`);

const config = {
  target: "web",
  entry: {
    index: `${sourcePath}/index.js`,
  },
  output: {
    path: path.resolve(__dirname, OUTPUT_DIR),
    filename: "[name].[contenthash:8][ext]",
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, `${sourcePath}/assets/`),
      theme: path.resolve(__dirname, `${sourcePath}/theme/`),
      style: path.resolve(__dirname, `${sourcePath}/theme/style.sass`),
    },
  },
  devServer: {
    open: true,
    host: "localhost",
    liveReload: true,
    static: {
      directory: path.join(__dirname, OUTPUT_DIR),
    },
    watchFiles: {
      paths: [`${sourcePath}/**/*.*`],
      options: {
        usePolling: true,
      },
    },
  },
  plugins: [
    new PugPlugin({
      verbose: true,
      pretty: true,
      js: {
        filename: "[name].[contenthash:8].js",
      },
      css: {
        filename: "[name].[contenthash:8].css",
      },
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        options: {
          method: "render",
          data: {
            // Pass isProduction variable to inject HRM code when is on development
            isProduction,
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
    config.entry = {
      index: "./src/index.pug",
    };
  }
  return config;
};
