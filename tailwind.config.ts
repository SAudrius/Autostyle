import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./components/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    screens: {
      sm: "555px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        md: "4rem",
        xl: "7.5rem",
      },
      screens: {
        sm: "768px",
        md: "1000px",
        lg: "1200px",
        xl: "1440px",
      },
    },
    extend: {
      fontFamily: {
        nunito: ["NunitoSans_10pt-Light"],
      },
      colors: {
        primary: "#7DFFFF",
        "primary-dark": "#4BCCD2",
        "neutral-900": "#000000",
        "neutral-800": "#161C1D",
        "neutral-500": "#9D9D9D",
        "neutral-100": "#F1F9F9",
        "neutral-000": "#ffffff",
      },
      letterSpacing: {
        tight: "0.25em",
        normal: "0.25em",
        "wide-6": "0.06em",
        "wide-10": "0.10em",
        "wide-12": "0.12em",
        "wide-20": "0.2em",
      },
      dropShadow: {
        text: "0 1px 2px rgba(0, 0, 0, 0.25)",
      },
      keyframes: {
        shine: {
          to: {
            "background-position-x": "-200%",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        loading: "shine 0.75s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
