import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin, { Configuration } from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function buildPlugins(params: BuildOptions): Configuration["plugins"] {
  const isDev = params.mode === "development";
  const isProd = params.mode === "production";

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: params.paths.html,
    }),
  ];

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
  }

  if (params.analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
