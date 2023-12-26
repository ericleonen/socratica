import type { Config } from 'tailwindcss'
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/theme/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        "sm": "2px 2px #334155",
        "md": "3px 3px #334155"
      },
      transitionProperty: {
        "margin": "margin",
        "deleting": "height, margin, border"
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: "#fdfdfd",
      gray: colors.gray,
      slate: colors.slate,
      indigo: colors.indigo,
      yellow: colors.yellow,
      amber: colors.amber,
      stone: colors.stone,
      red: colors.red,
      blue: colors.blue,
      sky: colors.sky,
      emerald: colors.emerald,
      violet: colors.violet
    }
  },
  plugins: [],
}
export default config
