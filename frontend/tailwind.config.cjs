/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "715px",
      lg: "1050px",
    },
    extend: {
      scale: {
        105: "1.01",
      },
    },
  },
  plugins: [],
};
