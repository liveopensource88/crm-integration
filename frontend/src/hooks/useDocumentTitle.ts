import { useEffect } from 'react';

const useDocumentTitle = (title: string, retainOnUnmount = false) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;

    return () => {
      if (!retainOnUnmount) {
        document.title = originalTitle;
      }
    };
  }, [title, retainOnUnmount]);
};

export default useDocumentTitle;
