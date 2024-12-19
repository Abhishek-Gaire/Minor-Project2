/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008a37", //00712D
        secondary: "#1A4D2E",
        tertiary: "#D6EFD8",
        title: "#222831",
        muted: "#727374",
        description: "#3C3D37",
      },
    },
  },
  plugins: [],
};
