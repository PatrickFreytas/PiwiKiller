/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Paleta de Tude (Figma "proyecto-ruta"). Los tokens completos se definen en HU-02.
      colors: {
        coral: '#FF5A79',
        vino: '#3D0A2A',
        fondo: '#FFF5F7',
        menta: '#12B886',
        sol: '#FFC530',
      },
    },
  },
  plugins: [],
};
