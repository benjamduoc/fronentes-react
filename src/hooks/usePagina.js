import { useEffect } from 'react';

export function usePagina(titulo, claseBody) {
  useEffect(() => {
    document.title = `${titulo} | Fronentes`;
  }, [titulo]);

  useEffect(() => {
    if (!claseBody) return;
    document.body.classList.add(claseBody);
    return () => document.body.classList.remove(claseBody);
  }, [claseBody]);
}
