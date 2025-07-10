const { CgDarkMode } = require("react-icons/cg");

// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
        '25%': { transform: 'translateX(-8px)' },
        '50%': { transform: 'translateX(8px)' },
        '75%': { transform: 'translateX(-4px)' },
        },
      },
      animation: {
        shake: 'shake 0.4s ease-in-out',
      },
    },
  },
  plugins: [],
};
