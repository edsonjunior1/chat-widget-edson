import { build } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = resolve(fileURLToPath(import.meta.url), '..');

async function buildAll() {
  console.log('Building library...');
  await build({
    configFile: resolve(__dirname, '../vite.config.lib.ts'),
    build: {
      outDir: 'dist'
    }
  });

  console.log('Building embed widget...');
  await build({
    configFile: resolve(__dirname, '../vite.config.embed.ts'),
    build: {
      outDir: 'dist'
    }
  });

  console.log('Build completed!');
}

buildAll().catch(console.error);
