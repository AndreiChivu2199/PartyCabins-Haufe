/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E1D6E7", // Light Lavender
          100: "#D4C5DE", // Soft Purple
          200: "#B7A1C6", // Light Purple
          300: "#997EBE", // Medium Purple
          400: "#7C59A6", // Rich Purple
          500: "#5E4B8C", // Dark Purple (Primary)
          600: "#4C3D71", // Deep Purple
          700: "#3C2F56", // Darker Purple
          800: "#2C213C", // Very Dark Purple
          900: "#1B1321", // Nearly Black
          950: "#141016", // Almost Black
        },
        accent: {
          50: "#E6F5E6", // Light Mint Green
          100: "#C8E8C8", // Soft Green
          200: "#A1D9A1", // Light Green
          300: "#7CCB7C", // Medium Green
          400: "#57B657", // Rich Green
          500: "#3A9F3A", // Dark Green (Accent)
          600: "#2E7B2E", // Deeper Green
          700: "#246B24", // Darker Green
          800: "#1A5A1A", // Very Dark Green
          900: "#0F3A0F", // Deep Green
          950: "#0C2D0C", // Very Dark Green
        },
      },
    },
  },
  plugins: [],
};
