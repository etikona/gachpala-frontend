// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // or "src" depending on your structure
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom plant-inspired light theme colors
        plant: {
          light: "#eaf4ea",
          DEFAULT: "#78c679",
          dark: "#4caf50",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
      },
      backgroundImage: {
        "plant-radial":
          "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(120,198,121,0.25), rgba(255,255,255,0))",
      },
    },
  },
  plugins: [],
};
