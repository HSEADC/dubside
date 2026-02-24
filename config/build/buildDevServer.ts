import { type Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer(params: BuildOptions): DevServerConfiguration {
  return {
    port: params.port ?? 8080,
    open: true,
    historyApiFallback: true, // если раздавать статику в nginx, надо делать проксирование на index.html
    hot: true
  };
}
