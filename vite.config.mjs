import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/blendcard/', // Caminho base para o deploy no InfinityFree
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});