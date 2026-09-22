import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load all env vars from .env — prefix '' means both VITE_ and non-prefixed are loaded
  const env = loadEnv(mode, process.cwd(), '');

  // Prefer the VITE_ prefixed key; fall back to the unprefixed one
  const apiKey = env.VITE_OPENROUTER_API_KEY || env.OPENROUTER_API_KEY || '';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      // Expose a single canonical env var that the service reads
      'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(apiKey)
    },
    server: {
      port: 5173,
      // Proxy /api calls to the Node backend so CORS is never an issue in dev
      proxy: {
        '/api': {
          target: 'http://localhost:5050',
          changeOrigin: true
        }
      }
    }
  };
});
