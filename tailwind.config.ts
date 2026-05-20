import type { Config } from "tailwindcss";

export default {
  content: [
    "./apps/**/*.{ts,tsx,html}",
    "./packages/ui/src/**/*.{ts,tsx}",
    "./packages/core/src/**/*.{ts,tsx}",
    "./packages/shared/src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151819",
        panel: "#f5f3ef",
        line: "#d8d2c8",
        accent: "#356b63"
      },
      boxShadow: {
        matte: "0 18px 50px rgba(20, 24, 25, 0.10)"
      }
    }
  },
  plugins: []
} satisfies Config;
