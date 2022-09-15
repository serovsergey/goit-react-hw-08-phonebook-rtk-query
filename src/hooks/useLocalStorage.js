import { useEffect } from "react";
import { useState } from "react";

const readArrayFromStorage = (storageKey, initialValue) => {
  const value = localStorage.getItem(storageKey);
  try {
    return value ? JSON.parse(value) : initialValue;
  } catch (error) {
    return initialValue;
  }
}

export const useLocalStorage = (storageKey, initialValue) => {
  const [value, setValue] = useState(() => readArrayFromStorage(storageKey, initialValue));

  useEffect(() => (
    localStorage.setItem(storageKey, JSON.stringify(value))
  ), [storageKey, value]);

  return [value, setValue];
};
