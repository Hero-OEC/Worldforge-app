import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Parchment-based color palette
        parchment: {
          50: "#f7f3eb", // Lightest parchment
          100: "#f1ead8", // Very light parchment
          200: "#e9ddca", // Base parchment color
          300: "#dcc9a8", // Medium parchment
          400: "#c9a876", // Darker parchment
          500: "#b8935a", // Deep parchment
          600: "#9d7a47", // Dark parchment
          700: "#7d5f38", // Very dark parchment
          800: "#5c452a", // Almost brown
          900: "#3d2e1c", // Deep brown
        },
        ink: {
          50: "#f8f7f5", // Very light ink
          100: "#e8e4df", // Light ink
          200: "#d1c7bc", // Medium light ink
          300: "#a69688", // Medium ink
          400: "#7a6b5d", // Dark ink
          500: "#5c4e42", // Deep ink
          600: "#4a3d33", // Very deep ink
          700: "#3d3228", // Almost black ink
          800: "#2d251c", // Dark brown ink
          900: "#1f1a14", // Darkest ink
        },
        accent: {
          50: "#fef7ed", // Light cream
          100: "#fdedd3", // Cream
          200: "#fad7a5", // Light gold
          300: "#f6bc6d", // Medium gold
          400: "#f19834", // Orange gold
          500: "#e67e22", // Deep orange
          600: "#d35400", // Dark orange
          700: "#b7472a", // Red orange
          800: "#943b29", // Dark red
          900: "#7a3426", // Deep red
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
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
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
