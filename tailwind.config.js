/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        primary: {
          '600': 'var(--primary-primary-600, #100A42)',
        },
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        pp: "1.8rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
        "6xl": "5rem",
      },
      boxShadow: {
        '3xl': '0px 4px 20px 0px rgba(0, 0, 0, 0.10);',
      }
    },
  },
  variants: {
    extend: {
      fontSize: ["responsive", "rem"],
      spacing: ["responsive", "rem"],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const remUtilities = {};
      for (let i = 0; i <= 100; i++) {
        remUtilities[`.text-${i}rem`] = {
          "font-size": `${i}rem`,
        };
        remUtilities[`.w-${i}rem`] = {
          width: `${i}rem`,
        };
        remUtilities[`.h-${i}rem`] = {
          height: `${i}rem`,
        };
        remUtilities[`.m-${i}rem`] = {
          margin: `${i}rem`,
        };
        remUtilities[`.mt-${i}rem`] = {
          'margin-top': `${i}rem`,
        };
        remUtilities[`.mr-${i}rem`] = {
          'margin-right': `${i}rem`,
        };
        remUtilities[`.mb-${i}rem`] = {
          'margin-bottom': `${i}rem`,
        };
        remUtilities[`.ml-${i}rem`] = {
          'margin-left': `${i}rem`,
        };
        remUtilities[`.p-${i}rem`] = {
          padding: `${i}rem`,
        };
        remUtilities[`.pt-${i}rem`] = {
          'padding-top': `${i}rem`,
        };
        remUtilities[`.pr-${i}rem`] = {
          'padding-right': `${i}rem`,
        };
        remUtilities[`.pb-${i}rem`] = {
          'padding-bottom': `${i}rem`,
        };
        remUtilities[`.pl-${i}rem`] = {
          'padding-left': `${i}rem`,
        };
        remUtilities[`.max-w-${i}rem`] = {
          'max-width': `${i}rem`,
        };
        remUtilities[`.max-h-${i}rem`] = {
          'max-height': `${i}rem`,
        };
      }

      addUtilities(remUtilities, ["responsive", "hover"]);
    }),
  ],
};
