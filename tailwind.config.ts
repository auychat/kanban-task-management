import type { Config } from 'tailwindcss'
const {nextui} = require('@nextui-org/react')

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      "bm": ["12px", { lineHeight: "15px",  }],
      "bl": ["13px", { lineHeight: "23px",  }],
      "hs": ["12px", { lineHeight: "15px",letterSpacing: "2.4px", }],
      "hm": ["15px", { lineHeight: "19px", }],
      "hl": ["18px", { lineHeight: "23px", }],
      "hxl": ["24px", { lineHeight: "30px", }],
    },
    extend: {
      backgroundImage: {
      },
      colors: {
        'purple-dark': '#635FC7',
        'purple-light': '#A8A4FF',
        'black': '#000112',
        'gray-darker': '#20212C',
        'gray-dark': '#2B2C37',
        'gray-medium': '#3E3F4E',
        'gray-light': '#828FA3',
        'blue-lightest': '#E4EBFA',
        'blue-lighter': '#F4F7FD',
        'white': '#FFFFFF',
        'red': '#EA5555',
        'red-light': '#FF9898',
      }
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config
