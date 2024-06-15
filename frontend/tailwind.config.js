/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '50%': '50%',
      '16': '4rem',
    },
    extend: {
      backgroundImage: {
        'Bguniverse': "url('/img/Bguniverse.png')",

        'Headerstars': "url('/img/Headerstars.jpg')",

        'logo': "url('/img/logo.png')",
        
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6b21a8",
          secondary: "#c084fc",
          accent: "#f4f2ff",
          neutral: "#2d2a2e",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
  
}
}