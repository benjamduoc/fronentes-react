import { useState } from 'react';

export function useFormulario(inicial) {
  const [valores, setValores] = useState(inicial);

  const cambiar = e => {
    const { name, value } = e.target;
    setValores(v => ({ ...v, [name]: value }));
  };
  const asignar = cambios => setValores(v => ({ ...v, ...cambios }));
  const reiniciar = () => setValores(inicial);

  return { valores, cambiar, asignar, reiniciar };
}
