import { useEffect, useRef, RefObject } from "react";

interface ClickOutsideHook<T extends HTMLElement> {
  ref: RefObject<T>;
}

export function useOutSideClick<T extends HTMLElement>(
  handler: () => void,
  listenCapturing = true
): ClickOutsideHook<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return { ref };
}
