/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* Internet Explorer va eski Edge uchun */
          'scrollbar-width': 'none',   /* Firefox uchun */
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',             /* Chrome, Safari, va boshqa WebKit brauzerlar uchun */
        },
      });
    },
  ],
}

