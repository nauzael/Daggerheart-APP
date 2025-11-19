import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: This ensures assets are loaded relatively (e.g., "./script.js" instead of "/script.js")
  // This prevents the "White Screen of Death" in Capacitor/Android
  base: './', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});