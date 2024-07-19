/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const rotateY = plugin(function ({ addUtilities }) {
    addUtilities({
        ".rotate-y-180": {
            transform: "rotateY(180deg)",
        },
    });
});

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                loading: {
                    from: { backgroundPosition: "0px" },
                    to: { backgroundPosition: "-600px" },
                },
            },
            colors: {
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    text: "hsl(var(--primary-text))",
                    "text-hover": "hsl(var(--primary-text-hover))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    text: "hsl(var(--secondary-text))",
                },
                emphasize: {
                    DEFAULT: "hsl(var(--emphasize))",
                    dark: "hsl(var(--emphasize-dark))",
                },
                light: {
                    DEFAULT: "hsl(var(--background-light))",
                },
                dark: {
                    DEFAULT: "hsl(var(--background-dark))",
                },
            },
            boxShadow: {
                round: "0 0 10px rgba(0, 0, 0, 0.5)",
            },
        },
    },
    plugins: [rotateY],
};
