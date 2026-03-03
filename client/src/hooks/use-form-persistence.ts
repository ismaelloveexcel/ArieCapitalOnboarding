import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Persists form data to localStorage so that navigating between steps
 * or accidentally refreshing the page does not lose entered data.
 */
export function useFormPersistence<T extends Record<string, unknown>>(
  key: string,
  initialState: T
): [T, (update: Partial<T> | ((prev: T) => T)) => void, () => void] {
  const storageKey = `arie-onboarding-${key}`;
  // Capture initialState in a ref so `clear` doesn't need it as a dependency
  const initialStateRef = useRef(initialState);

  const [state, setState] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with initialState to handle new fields added in future
        return { ...initialStateRef.current, ...parsed };
      }
    } catch {
      // Fall through to initialState if parsing fails
    }
    return initialStateRef.current;
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Ignore storage errors (e.g. private browsing quota)
    }
  }, [storageKey, state]);

  const update = useCallback(
    (patch: Partial<T> | ((prev: T) => T)) => {
      setState((prev) =>
        typeof patch === "function" ? patch(prev) : { ...prev, ...patch }
      );
    },
    []
  );

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // Ignore
    }
    setState(initialStateRef.current);
  }, [storageKey]);

  return [state, update, clear];
}
