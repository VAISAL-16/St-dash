// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'border-glow': 'border-glow 1.5s infinite ease-in-out',
        shake: 'shake 0.4s ease-in-out',
      },
      keyframes: {
        'border-glow': {
          '0%, 100%': { boxShadow: '0 0 0px rgba(0,0,0,0)' },
          '50%': { boxShadow: '0 0 20px rgba(59,130,246,0.6)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '50%': { transform: 'translateX(8px)' },
          '75%': { transform: 'translateX(-4px)' },
        },
      },
    },
  },
  plugins: [],
};
