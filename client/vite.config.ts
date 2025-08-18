import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false, // Set to true only if your backend uses HTTPS
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
