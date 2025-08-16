import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:5000',
        target: '${inport.meta.env.VITE_REACT_APP_BACKEND_BASEURL}',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
