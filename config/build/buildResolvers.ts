import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildResolvers(params: BuildOptions): Configuration["resolve"] {
  return {
    // ts-loader умеет работать с jsxs
    // если бы мы не использовали ts, нужен был бы доп лоудер (?)
    extensions: [".tsx", ".ts", ".js"],
  };
}
