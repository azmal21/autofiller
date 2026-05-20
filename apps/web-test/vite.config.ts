import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@autofill/core": path.resolve(__dirname, "../../packages/core/src"),
      "@autofill/shared": path.resolve(__dirname, "../../packages/shared/src"),
      "@autofill/ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@autofill/workers": path.resolve(__dirname, "../../packages/workers/src"),
    },
  },
});
