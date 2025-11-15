import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    plugins: {
      '@next': nextPlugin,
      'react': reactPlugin,
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', {
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_',
        'ignoreRestSiblings': true
      }],
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        'varsIgnorePattern': 'actionTypes|props|Leaf|Zap'
      }],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
