import { build } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import react from '@vitejs/plugin-react-swc';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🔨 Building library...');
await build({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env': '{}'
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'ChatWidget',
      fileName: (format) => format === 'cjs' ? 'index.cjs' : 'index.esm.js',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    outDir: 'dist',
    emptyOutDir: true
  }
});

console.log('🔨 Building embed widget...');
await build({
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

console.log('📝 Generating TypeScript declarations...');
try {
  execSync('tsc --emitDeclarationOnly --declaration --declarationMap', { 
    stdio: 'inherit',
    cwd: __dirname 
  });
} catch (error) {
  console.warn('⚠️  Erro ao gerar tipos TypeScript:', error.message);
}

console.log('📄 Generating test HTML...');
try {
  execSync('node scripts/generate-test-html.js', { 
    stdio: 'inherit',
    cwd: __dirname 
  });
} catch (error) {
  console.warn('⚠️  Erro ao gerar HTML de teste:', error.message);
}

console.log('✅ Build completo!');
