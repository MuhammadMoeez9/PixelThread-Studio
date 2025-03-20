import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";  // ✅ Import path

export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  plugins: [react()],
  assetsInclude: ["**/*.JPG", "**/*.MP4"],  // ✅ Add MP4 support
  base: "/",
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
  },
});
