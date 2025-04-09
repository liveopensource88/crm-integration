import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 4000,
    proxy: {
      '/prod/': {
        target: process.env.VITE_API_URL,
        changeOrigin: true
      }
    }
  }
});
