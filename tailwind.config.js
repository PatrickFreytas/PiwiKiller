/** @type {import('tailwindcss').Config} */
module.exports = {
  // 'class' evita el error de NativeWind en web al detectar el esquema de color; la app es solo clara.
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      // Paleta de Tude (Figma "proyecto-ruta" · 01 Guía de estilo). Mantener igual que src/theme/colors.ts.
      colors: {
        coral: { DEFAULT: '#FF5A79', 50: '#FFE8EE' },
        vino: '#3D0A2A',
        fondo: '#FFF5F7',
        menta: { DEFAULT: '#12B886', 50: '#E3F8F0', oscuro: '#0A8A63' },
        sol: { DEFAULT: '#FFC530', 50: '#FFF3CC', oscuro: '#8A6400' },
        plum: '#5B2EFF',
        texto2: '#8C869A',
        texto3: '#4A4458',
        borde: '#EEE9F2',
      },
      borderRadius: {
        pill: '12px',
        input: '14px',
        button: '16px',
        card: '20px',
      },
      fontFamily: {
        inter: ['Inter_400Regular'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-bold': ['Inter_700Bold'],
        'inter-extrabold': ['Inter_800ExtraBold'],
        'inter-black': ['Inter_900Black'],
      },
    },
  },
  plugins: [],
};
