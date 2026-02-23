import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";

  const styleOrExtract = isDev ? "style-loader" : MiniCssExtractPlugin.loader;

  const scssModuleLoader = {
    test: /\.module\.s[ac]ss$/i,
    use: [
      styleOrExtract,
      {
        loader: "css-loader",
        options: {
          esModule: false,
          modules: {
            localIdentName: isDev
              ? "[path][name]__[local]"
              : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    exclude: /\.module\.s[ac]ss$/i,
    use: [styleOrExtract, "css-loader", "sass-loader"],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  };

  return [scssModuleLoader, scssLoader, tsLoader];
}
