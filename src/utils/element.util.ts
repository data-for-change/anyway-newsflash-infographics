export const combineRefs =
  (...refs: any[]) =>
  (element: HTMLElement | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(element);
      } else {
        ref.current = element;
      }
    });
  };
