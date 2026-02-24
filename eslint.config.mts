import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default [
  // 1) Игнорируем мусор
  {
    ignores: ['dist/**', 'build/**', 'coverage/**', 'node_modules/**']
  },

  // 2) Базовые правила JS (для всех)
  js.configs.recommended,

  // 3) TypeScript (только для TS/TSX)
  ...tseslint.configs.recommended.map((cfg) => ({
    ...cfg,
    files: ['**/*.{ts,tsx}']
  })),

  // 4) React (только для JSX/TSX)
  {
    files: ['**/*.{jsx,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks
    },
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      // React 17+ (новый JSX transform) — импорт React не нужен
      'react/react-in-jsx-scope': 'off',

      // hooks — обязательно
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },

  // 5) Node-контекст для конфигов/скриптов
  {
    files: [
      '**/*.config.{js,cjs,mjs,ts}',
      'vite.config.*',
      'webpack.config.*',
      'scripts/**/*.{js,ts}'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  // 6) Отключаем конфликтующие с Prettier правила
  prettier
];
