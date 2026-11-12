import Constants from 'expo-constants';

/** Datos generales de la app, leídos de app.json. */
export const AppConfig = {
  name: Constants.expoConfig?.name ?? 'Tude',
  version: Constants.expoConfig?.version ?? '1.0.0',
} as const;
