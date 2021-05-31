import { useEffect, useRef, useState } from 'react';

export const useVisible = <T extends HTMLElement>(
  initialIsVisible: boolean,
) => {
  const [isVisible, setIsVisible] = useState<boolean>(initialIsVisible);
  const ref = useRef<T>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isVisible, setIsVisible };
};
