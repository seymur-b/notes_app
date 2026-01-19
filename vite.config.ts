import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      // This is the only alias you actually need for Shadcn/UI
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    // Helps with debugging build issues
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});