import { useEffect, useState } from 'react';

function leer(almacen, clave, inicial) {
  try {
    const guardado = almacen.getItem(clave);
    if (guardado !== null) return JSON.parse(guardado);
  } catch (error) {
    console.error(`No se pudo leer "${clave}" del almacenamiento`, error);
  }
  return inicial;
}

export function useAlmacenado(clave, inicial, almacen = window.localStorage) {
  const [valor, setValor] = useState(() => leer(almacen, clave, inicial));

  useEffect(() => {
    try {
      if (valor === null || valor === undefined) almacen.removeItem(clave);
      else almacen.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      console.error(`No se pudo guardar "${clave}" en el almacenamiento`, error);
    }
  }, [almacen, clave, valor]);

  return [valor, setValor];
}
