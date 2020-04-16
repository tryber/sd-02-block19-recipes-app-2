import { useState, useEffect } from 'react';

export default function useDebounce(text, radio, delay, canFetch) {
  const [debouncedValue, setDebouncedValue] = useState({ text, radio });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue((prevState) => ({ ...prevState, text, radio }));
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, radio, delay]);

  return debouncedValue;
}
