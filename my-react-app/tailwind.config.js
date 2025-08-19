/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
   plugins: [animate],
  theme: {
    extend: {},
  },
  plugins: [],
};
