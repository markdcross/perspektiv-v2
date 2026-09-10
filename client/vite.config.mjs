import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'REACT_APP_');
  return {
    plugins: [react()],
    resolve: { alias: { process: fileURLToPath(new URL('./src/browser-process.jsx', import.meta.url)) } },
    define: Object.fromEntries(Object.entries(env).map(([key, value]) => ['process.env.' + key, JSON.stringify(value)])),
    server: { port: 3000, proxy: { '/api': 'http://localhost:5000/', '/logs': 'http://localhost:5000/', '/techs': 'http://localhost:5000/' } },
    // Semantic UI 2 contains legacy selectors rejected by Lightning CSS minification.
    build: { outDir: 'build', cssMinify: false, emptyOutDir: true },
    test: { environment: 'jsdom', globals: true }
  };
});
