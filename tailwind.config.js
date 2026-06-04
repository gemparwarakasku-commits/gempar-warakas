/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E7D32",
          foreground: "#FFFFFF",
        },
        premium: {
          DEFAULT: "#1B5E20",
          foreground: "#FFFFFF",
        },
        soft: {
          DEFAULT: "#4CAF50",
          foreground: "#FFFFFF",
        },
        mint: {
          DEFAULT: "#E8F5E9",
          foreground: "#1A1A1A",
        },
        background: "#FAFBFA",
        surface: "#FFFFFF",
        danger: {
          DEFAULT: "#F44336",
          foreground: "#FFFFFF",
        },
        info: {
          DEFAULT: "#2196F3",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#FFC107",
          foreground: "#1A1A1A",
        },
        neutral: {
          900: "#1A1A1A",
          600: "#666666",
          500: "#999999",
          400: "#CCCCCC",
          200: "#EEEEEE",
          100: "#F5F5F5",
        },
        border: "#CCCCCC",
        input: "#CCCCCC",
        ring: "#2E7D32",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        display: ["32px", { lineHeight: "1.2", fontWeight: "700" }],
        "heading-1": ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        "heading-2": ["20px", { lineHeight: "1.3", fontWeight: "600" }],
        "heading-3": ["16px", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["14px", { lineHeight: "1.5", fontWeight: "400" }],
        caption: ["12px", { lineHeight: "1.4", fontWeight: "400" }],
        overline: ["10px", { lineHeight: "1.2", fontWeight: "600" }],
      },
      spacing: {
        "space-4": "4px",
        "space-8": "8px",
        "space-12": "12px",
        "space-16": "16px",
        "space-20": "20px",
        "space-24": "24px",
        "space-32": "32px",
        "space-40": "40px",
        "space-48": "48px",
        "space-64": "64px",
      },
      borderRadius: {
        "radius-xs": "6px",
        "radius-sm": "10px",
        "radius-md": "16px",
        "radius-lg": "24px",
        "radius-xl": "32px",
        "radius-full": "999px",
      },
      boxShadow: {
        "shadow-xs": "0 1px 2px rgba(0,0,0,0.05)",
        "shadow-sm": "0 2px 4px rgba(0,0,0,0.08)",
        "shadow-md": "0 4px 12px rgba(0,0,0,0.12)",
        "shadow-lg": "0 8px 24px rgba(0,0,0,0.16)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
        "slide-up": "slide-up 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        "slide-down": "slide-down 200ms ease-in",
        "fade-in": "fade-in 200ms ease-in-out",
        "scale-in": "scale-in 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        "count-up": "count-up 600ms ease-out",
      },
      screens: {
        mobile: { max: "767px" },
        tablet: { min: "768px", max: "1023px" },
        desktop: { min: "1024px" },
      },
      maxWidth: {
        mobile: "600px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
