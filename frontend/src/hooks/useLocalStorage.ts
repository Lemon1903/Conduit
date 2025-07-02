import { useCallback, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<typeof initialValue>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage", error);
      return initialValue;
    }
  });

  const setStoredValue = useCallback(
    (newValue: T) => {
      try {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.error("Error writing to localStorage", error);
      }
    },
    [key],
  );

  return [value, setStoredValue] as const;
}
