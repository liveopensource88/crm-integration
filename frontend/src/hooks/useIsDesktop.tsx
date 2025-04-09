import { useState, useEffect, useCallback } from 'react';

export const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const handleResize = useCallback(() => {
    setIsDesktop(window.innerWidth > 768);
  }, []);

  useEffect(() => {
    handleResize();

    const resizeTimeout = setTimeout(() => {
      window.addEventListener('resize', handleResize);
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [handleResize]);

  return isDesktop;
};
