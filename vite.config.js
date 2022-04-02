import { defineConfig, loadEnv, splitVendorChunkPlugin } from "vite";

import react from "@vitejs/plugin-react";
const path = require("path");

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    plugins: [react(), splitVendorChunkPlugin()],
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },

    envDir: "./",
    envPrefix: "NF_",
    server: {
      host: true,
    },
  });
};
