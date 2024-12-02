import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',  // use this if needed
  },
  esbuild: {
    target: 'esnext', // Ensures modern syntax compatibility
  },  
  build: {
    outDir: 'dist'
  }
});