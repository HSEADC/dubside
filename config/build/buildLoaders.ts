import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { BuildOptions } from './types/types';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const styleOrExtract = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;

  const accetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{ loader: '@svgr/webpack', options: { icon: true } }]
  };

  const scssModuleLoader = {
    test: /\.module\.s[ac]ss$/i,
    use: [
      styleOrExtract,
      {
        loader: 'css-loader',
        options: {
          esModule: false,
          modules: {
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
          }
        }
      },
      'sass-loader'
    ]
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    exclude: /\.module\.s[ac]ss$/i,
    use: [
      styleOrExtract,
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sassOptions: { includePaths: [options.paths.src] }
        }
      }
    ]
  };

  const tsLoader = {
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
          })
        }
      }
    ]
  };

  const videoLoader = {
    test: /\.(mp4|webm|ogg|mov)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'videos/[hash][ext][query]'
    }
  };

  const fontLoader = {
    test: /\.(ttf|otf|woff|woff2)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[hash][ext][query]'
    }
  };

  return [accetLoader, scssModuleLoader, scssLoader, tsLoader, svgrLoader, videoLoader, fontLoader];
}
