import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bemitex: {
          maroon: "#722F37", // Wine/Maroon
          gold: "#D4AF37", // Accent Gold
          cream: "#FFFDD0", // Ivory/Cream
          dark: "#1A1A1A"
        }
      },
    },
  },
  plugins: [],
};
export default config;
