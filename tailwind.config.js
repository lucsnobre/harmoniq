/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Frutiger Aero color palette
        aero: {
          blue: {
            light: "#97C4E2",
            DEFAULT: "#67A9D7",
            dark: "#3A7FC2",
          },
          cyan: {
            light: "#A0E0E0",
            DEFAULT: "#6CCED0",
            dark: "#48B3B7",
          },
          green: {
            light: "#A1E9C5",
            DEFAULT: "#6CD9A0",
            dark: "#3BB679",
          },
          orange: {
            light: "#FFCBA4",
            DEFAULT: "#FFA76A",
            dark: "#FF8C42",
          },
          gray: {
            lightest: "#F6F8FA",
            light: "#E1E6EB",
            DEFAULT: "#C0C8D2",
            dark: "#9DA5B4",
            darkest: "#737D8C",
          },
        },
        // Glass effect background colors (with transparency)
        glass: {
          light: "rgba(255, 255, 255, 0.15)",
          DEFAULT: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(0, 0, 0, 0.05)",
        },
      },
      fontFamily: {
        sans: [
          "Segoe UI",
          "Frutiger",
          "Frutiger Linotype",
          "Dejavu Sans",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      borderRadius: {
        'aero': '1.5rem',
        'aero-lg': '2rem',
        'aero-xl': '2.5rem',
      },
      boxShadow: {
        'aero': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        'aero-inner': 'inset 0 8px 32px 0 rgba(31, 38, 135, 0.05)',
        'aero-button': '0 4px 10px 0 rgba(31, 38, 135, 0.15)',
        'aero-card': '0 10px 20px rgba(0, 0, 0, 0.07), 0 6px 6px rgba(0, 0, 0, 0.03)',
      },
      backdropBlur: {
        'aero': '15px',
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 0.3s linear',
        'scaleUp': 'scaleUp 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(103, 169, 215, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(103, 169, 215, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: 1 },
          '100%': { transform: 'scale(4)', opacity: 0 },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
