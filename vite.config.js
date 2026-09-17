import { defineConfig } from "vite";

export default defineConfig({
  base: "/mustapha-portfolio/",
  server: {
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5173,
    },
  },
});
