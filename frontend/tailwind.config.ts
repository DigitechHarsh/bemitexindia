import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        blink: 'blink 1s step-start infinite',
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(100vw)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
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
