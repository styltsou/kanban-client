import { defineConfig } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react-swc';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import sass from 'sass';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass,
      },
    },
  },
});
