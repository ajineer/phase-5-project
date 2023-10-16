/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'light_navy':'#13AABD',
        'mirky_water':'#37818A',
        'leafy_green':'#01EF83',
        'blood_orange':'#F23C42',
        'violet':'#BD136D'
      },
      backgroundImage:{
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'background': 'url("/src/assets/PlanlyBG4.png")'
      },
    },
  },
  plugins: [],
}

