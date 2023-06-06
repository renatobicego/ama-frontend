/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT"

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "sm": "640px",
        "md"	: "768px",	
        "lg"	: "1024px",	
        "xl"	: "1280px",	
        "2xl"	: "1536px"
      }
    },
    colors: {
      'primary1': '#FFBE34',
      'primary2': '#6C2F2F',
      'secondary1': '#F4F4F4',
      'white': '#ffffff',
      'title': '#280C0C',
      'text': '#1C0000',
      'gradient1': '#FFD781',
      'tag-bg': '#60151570',
      'hamburguer-menu-bg': '#8F4242'
    },
    fontFamily: {
      'title': ['Rubik', 'sans-serif'],
      'text': ['Krub', 'sans-serif']
    }
  },
  plugins: [],
})
