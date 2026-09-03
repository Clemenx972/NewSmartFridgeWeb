import type { Config } from 'tailwindcss'

/**
 * Palette alignée sur l'application réelle (captures dans design/captures/).
 * Le bleu #0A7CD4 est celui des boutons « Ajouter » et « Analyser ».
 * L'ambre porte l'urgence (badges « 4 j », « Stock faible »), le violet l'IA.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bleu produit — repris de l'app
        primary: {
          DEFAULT: '#0A7CD4',
          50:  '#EAF4FD',
          100: '#D2E8FA',
          200: '#A9D3F5',
          300: '#74B8EE',
          400: '#3D9AE4',
          500: '#0A7CD4',
          600: '#0868B4',
          700: '#075694',
          800: '#064575',
          900: '#053759',
        },
        // Ambre — expiration proche, stock faible
        warn: {
          DEFAULT: '#D97B06',
          50:  '#FEF6E9',
          100: '#FCE9C8',
          200: '#F8D28D',
          300: '#F0B44E',
          400: '#E39620',
          500: '#D97B06',
          600: '#B36105',
          700: '#8C4B06',
          800: '#6B3A08',
          900: '#4F2C09',
        },
        // Violet — fonctions IA (bouton étincelle de l'app)
        ai: {
          DEFAULT: '#8B3FD9',
          50:  '#F5EDFC',
          100: '#E9D9F8',
          200: '#D4B4F1',
          300: '#B984E7',
          400: '#9F5CDF',
          500: '#8B3FD9',
          600: '#7230B6',
          700: '#5A2691',
          800: '#451D70',
          900: '#331555',
        },
        // Rouge — suppression, urgence critique
        danger: {
          DEFAULT: '#D23B41',
          50:  '#FDEEEF',
          100: '#FAD7D9',
          500: '#D23B41',
          600: '#B02C32',
          700: '#8E2328',
        },
        // Fond bleuté de l'app
        canvas: '#EAF4FD',
        // Bleu profond des sections sombres
        ink: {
          DEFAULT: '#0B2233',
          700: '#123045',
          800: '#0E2839',
          900: '#0B2233',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(160deg, #0B2233 0%, #123A54 100%)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,34,51,0.04), 0 8px 24px -12px rgba(11,34,51,0.12)',
        'card-hover': '0 4px 8px rgba(11,34,51,0.06), 0 20px 40px -16px rgba(11,34,51,0.18)',
        cta: '0 8px 24px -8px rgba(10,124,212,0.45)',
        device: '0 34px 80px -22px rgba(0,0,0,0.55)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
