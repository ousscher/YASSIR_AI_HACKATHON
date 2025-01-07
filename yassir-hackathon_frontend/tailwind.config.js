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
        "my-purple":"#6420D4", 
        "my-white":"#FFFFFF",
        "my-pink":"#FB2576",
        "my-black":"#000000",
        "my-gray":"#F6F3F6",
      },
    },
  },
  plugins: [],
};
