import { useEffect, useState } from "react";
import { UseDebounceParams } from "./useDebounce.interface";

export function useDebounce<T>({
  value,
  delay = 500,
  onDebounce,
}: UseDebounceParams<T>): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      onDebounce();
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay, onDebounce]);

  return debouncedValue;
}
