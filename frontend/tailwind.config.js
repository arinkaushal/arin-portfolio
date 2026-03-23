/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: '#00ff88',
        'neon-dim': '#00cc6a',
        'neon-dark': '#00994f',
        dark: '#000000',
        'dark-card': '#0a0a0a',
        'dark-border': '#111111',
        'dark-muted': '#1a1a1a',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 5px #00ff88, 0 0 20px #00ff8840, 0 0 40px #00ff8820',
        'neon-sm': '0 0 3px #00ff88, 0 0 10px #00ff8840',
        'neon-lg': '0 0 10px #00ff88, 0 0 30px #00ff8860, 0 0 60px #00ff8830',
        'neon-border': 'inset 0 0 10px #00ff8810',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'text-flicker': 'textFlicker 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px #00ff88, 0 0 20px #00ff8840' },
          '50%': { boxShadow: '0 0 15px #00ff88, 0 0 40px #00ff8870, 0 0 60px #00ff8840' },
        },
        textFlicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.8' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.9' },
          '97%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}
