/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./utils/testSetup.ts",

    css: true,
  },
  resolve: {
    alias: {
      utils: resolve(__dirname, "./utils"),
      client: resolve(__dirname, "./client"),
    },
  },
});
