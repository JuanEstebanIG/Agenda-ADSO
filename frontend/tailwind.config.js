/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        senaPurple: "#7c3aed",
        senaPurpleDark: "#5b21b6",
        neoBg: "#0a0a0c", // Very dark background
        neoGlass: "rgba(20, 20, 25, 0.4)", // Dark glass
        neoGlassHover: "rgba(35, 35, 45, 0.5)",
        neoBorder: "rgba(255, 255, 255, 0.08)",
        neoAccent: "#d946ef", // Fuchsia
        neoAccentCyan: "#06b6d4" // Cyan
      },
      animation: {
        'glitch': 'glitch 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-down': 'slide-down 0.3s ease-out',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'slide-down': {
          from: { opacity: 0, transform: 'translate(-50%, -100%)' },
          to: { opacity: 1, transform: 'translate(-50%, 0)' }
        }
      }
    },
  },
  plugins: [],
};