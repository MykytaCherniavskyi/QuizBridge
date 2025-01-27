import { crx } from '@crxjs/vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import manifest from './manifest.json';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, './src');

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': srcDir
    },
  },
  plugins: [react(), crx({ manifest })],
});
