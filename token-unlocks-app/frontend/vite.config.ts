import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/token-unlocks-app/"  // critical for deploying under that subpath
});
