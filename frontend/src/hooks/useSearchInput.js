import { useEffect, useRef, useState } from 'react';

const SEARCH_DEBOUNCE_MS = 500;

export default function useSearchInput(initialValue, onCommit) {
  const [searchInput, setSearchInput] = useState(initialValue);
  const debounceTimeout = useRef(null);

  const handleSearchChange = e => {
    const nextValue = e.target.value;
    setSearchInput(nextValue);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (nextValue !== initialValue) {
        onCommit(nextValue);
      }
    }, SEARCH_DEBOUNCE_MS);
  };

  // Sync input if initialValue changes externally (e.g. URL cleared)
  useEffect(() => {
    setSearchInput(initialValue);
  }, [initialValue]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return { searchInput, handleSearchChange };
}
