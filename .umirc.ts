import { defineConfig } from 'umi';
import path from 'path'
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
export default defineConfig({
  alias: {
    '@mapu': path.resolve(__dirname, './mapu/src')
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index/index' },
  ],
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    memo.plugin('monaco').use('monaco-editor-webpack-plugin')
  }
});
