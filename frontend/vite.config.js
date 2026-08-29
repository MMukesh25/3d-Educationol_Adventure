import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    // Split large Three.js chunks for faster initial load
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    // Increase chunk size warning limit for Three.js bundle
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['three', 'react', 'react-dom', 'react-router-dom'],
  },
});
