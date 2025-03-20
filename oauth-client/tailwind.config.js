/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#4F46E5',
          secondary: '#6366F1',
          background: 'var(--background)',
          foreground: 'var(--foreground)',
        },
      },
    },
    plugins: [],
  }