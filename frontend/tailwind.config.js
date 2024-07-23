/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [ './index.html',
              './src/**/*.{jsx,js,tsx,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}

