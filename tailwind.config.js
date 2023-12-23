/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				loading: {
					from: { backgroundPosition: "0px" },
					to: { backgroundPosition: "-600px" },
				},
			},
		},
	},
	plugins: [],
};
