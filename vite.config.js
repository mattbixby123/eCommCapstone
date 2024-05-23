import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    plugins: [react()],
    server: {
    host: true,
    strictPort: true,
    port: 3000,
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
    },
    },
    resolve: {}
  },
});
