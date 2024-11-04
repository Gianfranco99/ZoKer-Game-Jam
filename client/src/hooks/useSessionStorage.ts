import { useCallback } from 'react';

export const useSessionStorage = () => {
  const isNotSSR = typeof window !== 'undefined';

  const setItem = useCallback(
    (key: string, value: string) => {
      if (isNotSSR) sessionStorage.setItem(key, value);
    },
    [isNotSSR]
  );

  const getItem = useCallback(
    (key: string) => {
      if (isNotSSR) return sessionStorage.getItem(key) || null;
    },
    [isNotSSR]
  );

  const removeItem = useCallback(
    (key: string) => {
      if (isNotSSR) sessionStorage.removeItem(key);
    },
    [isNotSSR]
  );

  return { setItem, getItem, removeItem };
};
