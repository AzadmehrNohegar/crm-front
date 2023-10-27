/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flexBasis: {
        modified: "calc(50% - 0.5rem)",
        modified3: "calc(33% - 0.5rem)",
      },
      height: {
        container: "calc(100vh - 89px)",
        innerContainer: "calc(100vh - 129px)",
        extended: "calc(16px + 1.6rem)",
      },
      maxHeight: {
        container: "calc(100vh - 89px)",
        innerContainer: "calc(100vh - 129px)",
      },
      width: {
        container: "calc(5/6 * 100% - 2.5rem)",
        extended: "calc(100% + 16px)",
      },
      borderRadius: {
        custom: "20px",
      },
      boxShadow: {
        ev1: "0px 2px 4px 1px rgba(30, 30, 30, 0.04), 0px 1px 1px 0px rgba(30, 30, 30, 0.02)",
        ev2: "0px 4px 10px 0px rgba(30, 30, 30, 0.08), 0px 1px 4px 0px rgba(30, 30, 30, 0.04)",
        ev3: "0px 8px 32px 0px rgba(30, 30, 30, 0.08), 0px 2px 20px 0px rgba(30, 30, 30, 0.04)",
        ev4: "0px 24px 60px 0px rgba(30, 30, 30, 0.12), 0px 8px 20px 0px rgba(30, 30, 30, 0.06)",
        header:
          "0px 8px 32px 0px rgba(46, 51, 56, 0.08), 0px 2px 20px 0px rgba(46, 51, 56, 0.04)",
      },
      colors: {
        primary: {
          50: "#faeaeb",
          100: "#f6d5d7",
          200: "#edabaf",
          300: "#e38286",
          400: "#da585e",
          DEFAULT: "#d12e36",
          500: "#d12e36",
          600: "#bc2931",
          700: "#922026",
          800: "#69171b",
          900: "#541216",
        },
        secondary: {
          50: "#e6efff",
          100: "#ccdfff",
          200: "#99beff",
          300: "#669eff",
          400: "#337eff",
          DEFAULT: "#005eff",
          500: "#005eff",
          600: "#004bcc",
          700: "#003899",
          800: "#002f80",
          900: "#002566",
        },
        grey: {
          50: "#F9F9F9",
          100: "#f2f2f2",
          200: "#e6e6e6",
          300: "#d9d9d9",
          400: "#b3b3b3",
          DEFAULT: "#b3b3b3",
          500: "#808080",
          600: "#595959",
          700: "#404040",
          800: "#262626",
          900: "#1E1E1E",
        },
        danger: {
          50: "#ffe6eb",
          100: "#fecdd7",
          200: "#fd9bae",
          300: "#fd6886",
          400: "#fc365e",
          DEFAULT: "#e61920",
          500: "#e61920",
          600: "#e20330",
          700: "#b00325",
          800: "#970220",
          900: "#640215",
        },
        warning: {
          50: "#fff9e6",
          100: "#fff2cc",
          200: "#ffe699",
          300: "#ffd966",
          400: "#ffcc33",
          DEFAULT: "#ffcc33",
          500: "#ffbf00",
          600: "#e6ac00",
          700: "#cc9900",
          800: "#997300",
          900: "#664d00",
        },
        info: {
          50: "#e6f1ff",
          100: "#cce3ff",
          200: "#99c7ff",
          300: "#66abff",
          400: "#338fff",
          DEFAULT: "#0073ff",
          500: "#0073ff",
          600: "#005ccc",
          700: "#0050b3",
          800: "#004599",
          900: "#002e66",
        },
        success: {
          50: "#eafaf3",
          100: "#d5f6e7",
          200: "#abedce",
          300: "#82e3b6",
          400: "#58da9d",
          DEFAULT: "#43d691",
          500: "#43d691",
          600: "#29bc78",
          700: "#25a76a",
          800: "#1c7d50",
          900: "#125435",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        xTheme: {
          primary: "#d12e36",
          "primary-focus": "#922026",
          "primary-content": "#F7F7F8",
          secondary: "#004bcc",
          "secondary-focus": "#002f80",
          "secondary-content": "#F7F7F8",
          accent: "#f2f2f2",
          "accent-focus": "#808080",
          "accent-content": "#60626C",
          info: "#0073ff",
          "info-content": "#0050b3",
          success: "#43d691",
          "success-content": "#F7F7F8",
          warning: "#ffcc33",
          "warning-content": "#F7F7F8",
          error: "#e61920",
          "error-content": "#F7F7F8",
          "base-100": "#ffffff",
          "base-content": "#262626",
        },
      },
    ],
  },
};
