/**
 * Paleta de marca de Tude (Figma "proyecto-ruta" · 01 Guía de estilo TUDE).
 * Son los valores crudos; en pantallas y componentes usa `useTheme()`.
 */
export const Palette = {
  coral: '#FF5A79',
  coral50: '#FFE8EE',
  vino: '#3D0A2A',
  fondo: '#FFF5F7',
  blanco: '#FFFFFF',
  menta: '#12B886',
  menta50: '#E3F8F0',
  mentaOscuro: '#0A8A63',
  sol: '#FFC530',
  sol50: '#FFF3CC',
  solOscuro: '#8A6400',
  plum: '#5B2EFF',
  texto2: '#8C869A',
  texto3: '#4A4458',
  borde: '#EEE9F2',
  bordeInput: '#E6E0EC',
  grisSuave: '#F3EFF6',
  iconoSuave: '#D5CFDC',
  asa: '#E2DDE8',
  pista: '#F0EBF3',
  mapa: '#E9F1EA',
  mapaVerde: '#CFE6D2',
  mapaAzul: '#D7E0F0',
  whatsapp: '#25D366',
  yape: '#6C1D8F',
  plin: '#16B5C8',
  google: '#4285F4',
  facebook: '#1877F2',
} as const;

/**
 * Colores por tema. El Figma solo define el modo claro, así que la app es siempre clara;
 * cuando exista un diseño oscuro se agrega aquí como `dark`.
 */
export const Colors = {
  light: {
    text: Palette.vino,
    textSecondary: Palette.texto2,
    textBody: Palette.texto3,
    background: Palette.fondo,
    backgroundElement: Palette.blanco,
    backgroundSelected: Palette.coral50,
    backgroundMuted: Palette.grisSuave,
    primary: Palette.coral,
    primarySoft: Palette.coral50,
    onPrimary: Palette.blanco,
    contrast: Palette.vino,
    onContrast: Palette.blanco,
    border: Palette.borde,
    inputBorder: Palette.bordeInput,
    iconMuted: Palette.iconoSuave,
    success: Palette.menta,
    successSoft: Palette.menta50,
    successText: Palette.mentaOscuro,
    warning: Palette.sol,
    warningSoft: Palette.sol50,
    warningText: Palette.solOscuro,
    promo: Palette.plum,
    shadow: Palette.vino,
    handle: Palette.asa,
    track: Palette.pista,
    whatsapp: Palette.whatsapp,
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ThemeColor = keyof typeof Colors.light;
