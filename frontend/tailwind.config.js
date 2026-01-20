/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // System-enforced priority colors (non-customizable)
        priority: {
          high: '#EF4444',      // Red
          medium: '#F59E0B',    // Orange
          low: '#10B981',       // Green
        },
        status: {
          active: '#10B981',    // Green
          pending: '#F59E0B',   // Orange
          inactive: '#6B7280',  // Gray
          error: '#EF4444',     // Red
        }
      },
    },
  },
  plugins: [],
}
