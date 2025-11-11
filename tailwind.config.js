/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F8F7F2", // your custom primary color
        secondary: "#F4EDDD", // your custom secondary color
        tertiary: "#001A47",
      },
    },
  },
  plugins: [],
};
