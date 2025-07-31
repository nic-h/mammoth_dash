/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,js,jsx,ts,tsx}"],
  safelist: [
    "bg-black",
    "text-green-400",
    "border-green-700",
    "text-black",
    "bg-green-700"
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Fira Code", "Menlo", "SFMono-Regular", "monospace"]
      }
    }
  },
  plugins: []
};
