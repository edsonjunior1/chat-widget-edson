import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {},
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      'chat-widget-edson': resolve(__dirname, '../../dist/index.esm.js'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['chat-widget-edson'],
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
