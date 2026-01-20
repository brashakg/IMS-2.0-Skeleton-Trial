/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color (calm blue-grey instead of aggressive red)
        brand: {
          primary: '#2563EB',    // Professional blue
          light: '#3B82F6',      
          dark: '#1E40AF',       
        },
        // Red reserved for errors/alerts ONLY
        alert: {
          error: '#DC2626',      // Error red
          warning: '#F59E0B',    // Warning amber
          success: '#059669',    // Success green
        },
        // System-enforced priority colors (non-customizable)
        priority: {
          high: '#DC2626',       // Red (errors only)
          medium: '#F59E0B',     // Amber
          low: '#059669',        // Green
        },
        status: {
          active: '#059669',     // Green
          pending: '#F59E0B',    // Amber
          inactive: '#6B7280',   // Gray
          error: '#DC2626',      // Red
        },
      },
    },
  },
  plugins: [],
}
