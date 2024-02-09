import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        twitterTheme: {
          extend: 'dark',
          colors: {
            background: {DEFAULT: '#000'},
            primary: {DEFAULT: '#1d9bf0'},
            'primary-text': '#eff3f4',
            'secondary-text': '#71767b',
            'accent-text': '#1d9bf0',
            'light-bg': '#2f3336',
            'primary-background': 'rgba(29,155,240,0.1)'
          }
        }
      }
    })
  ],
}