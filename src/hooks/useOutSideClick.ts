import { useRef, useEffect, RefObject } from "react";

export function useOutSideClick(callback: () => void): { ref: RefObject<HTMLDivElement> } {
  const ref = useRef<HTMLDivElement>(null); // Ensure this is HTMLDivElement

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return { ref };
}
