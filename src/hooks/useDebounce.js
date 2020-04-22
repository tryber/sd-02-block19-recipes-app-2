import { useState, useEffect } from 'react';

export default function useDebounce(text, radio, didFetch = false, delay) {
  const [debouncedValue, setDebouncedValue] = useState({ text, radio, didFetch });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(({ text, radio, didFetch }));
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [text, radio, delay, didFetch]);

  return debouncedValue;
}
