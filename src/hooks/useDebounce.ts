import { useState, useEffect } from "react";

/**
 * Hook personalizado para "debouncing" de um valor.
 *
 * @param {any} value O valor a ser "debounced".
 * @param {number} delay O tempo de atraso em milissegundos.
 * @returns {any} O valor "debounced".
 */
const useDebounce = (value: string, delay: number) => {
  // Estado para armazenar o valor "debounced"
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Configura um temporizador para atualizar o valor "debounced" após o atraso especificado
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Função de limpeza que é executada quando o efeito é re-executado ou o componente é desmontado
      // Isso garante que o temporizador seja limpo se o valor mudar antes do atraso ter passado
      return () => {
        clearTimeout(handler);
      };
    },
    // O efeito será re-executado apenas se o `value` ou o `delay` mudar
    [value, delay]
  );

  return debouncedValue;
};

export default useDebounce;
