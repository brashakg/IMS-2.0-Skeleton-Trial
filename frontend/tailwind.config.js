/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors (25% darker from original #E53935)
        brand: {
          primary: '#A82824',    // Main red (25% darker)
          light: '#C93834',      // Lighter variant
          dark: '#7A1D1A',       // Darker variant
        },
        // System-enforced priority colors (non-customizable)
        priority: {
          high: '#C62828',       // Dark Red
          medium: '#D68400',     // Dark Orange
          low: '#0D8A68',        // Dark Green
        },
        status: {
          active: '#0D8A68',     // Dark Green
          pending: '#D68400',    // Dark Orange
          inactive: '#525252',   // Dark Gray
          error: '#C62828',      // Dark Red
        },
        // Accent colors
        accent: {
          orange: '#D68400',     // 25% darker from #fd7e14
        }
      },
    },
  },
  plugins: [],
}
