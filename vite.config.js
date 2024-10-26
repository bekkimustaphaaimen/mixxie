import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import Node.js path module

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
});