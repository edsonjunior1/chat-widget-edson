import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': '{}',
    'global': 'window'
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/embed.tsx'),
      name: 'ChatWidgetEmbed',
      fileName: () => 'widget.js',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        globals: {}
      }
    },
    cssCodeSplit: false,
    sourcemap: false,
    outDir: 'dist',
    emptyOutDir: false
  }
});
