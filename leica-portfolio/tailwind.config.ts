import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Leica Red - used sparingly for accents
                leica: {
                    red: "#E00707",
                    "red-hover": "#C00606",
                },
                // Light mode
                light: {
                    bg: "#FAFAFA",
                    "bg-secondary": "#F0F0F0",
                    text: "#1A1A1A",
                    "text-secondary": "#666666",
                },
                // Dark mode
                dark: {
                    bg: "#0D0D0D",
                    "bg-secondary": "#1A1A1A",
                    text: "#F5F5F5",
                    "text-secondary": "#999999",
                },
            },
            fontFamily: {
                serif: ["Playfair Display", "Georgia", "serif"],
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            letterSpacing: {
                "extra-wide": "0.15em",
            },
            animation: {
                "fluid-slow": "fluidMove 60s ease-in-out infinite",
            },
            keyframes: {
                fluidMove: {
                    "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
                    "33%": { transform: "translate(2%, 2%) rotate(1deg)" },
                    "66%": { transform: "translate(-1%, 1%) rotate(-0.5deg)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
