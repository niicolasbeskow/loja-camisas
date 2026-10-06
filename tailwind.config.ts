import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        breu: '#000000',
        grafite: '#161616',
        branco: '#FFFFFF',
        concreto: '#9A9A9A',
        ambar: '#F59E0B',
      },
      fontFamily: {
        display: ['var(--font-anton)'],
        sans: ['var(--font-outfit)'],
      },
    },
  },
  plugins: [],
} satisfies Config;