import { defineConfig } from "vite";
export default defineConfig({
  server: {
    proxy: {
      "/cook": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
