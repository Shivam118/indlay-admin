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
        cta: "#074A6A",
        ctaDarker: "#022D42",
        secondary: "#FE6240",
        indlay: "#9B9EA6",
        borderIndlay: "#EDF0EF",
        bgIndlay: "#FBFBFB",
        white12: "#FFFFFF1F",
        white24: "#FFFFFF3D",
        white48: "#FFFFFF7A",
        white96: "#FFFFFFF5",
        white: "#FFFFFF",
        black12: "#0000001F",
        black24: "#0000003D",
        black48: "#0000007A",
        black96: "#000000F5",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
