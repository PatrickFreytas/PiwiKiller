import { useRouter } from 'expo-router';
import { useCallback } from 'react';

/**
 * Devuelve una función para volver a la pantalla anterior.
 * Si no hay historial (se abrió la pantalla por un enlace directo), va a Inicio.
 */
export function useGoBack() {
  const router = useRouter();

  return useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  }, [router]);
}
