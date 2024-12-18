import { Direction } from 'models/ScrollObserver.model';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface IProps {
  newsId: string;
  containerRef: React.RefObject<HTMLDivElement>;
  newsData: any[];
  newsLoading: boolean;
  onScroll: (direction: Direction) => void;
}

export const useScrollObserver = ({ newsId, onScroll, containerRef, newsData, newsLoading }: IProps) => {
  const selectedItemRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const isInViewFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && newsId && newsData.length > 0 && !newsLoading) {
      const itemIndex = newsData.findIndex((item) => item.id.toString() === newsId);

      if (itemIndex !== -1) {
        requestAnimationFrame(() => {
          selectedItemRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        });
      }
      isFirstRender.current = false;
    }
  }, [newsId, newsData, newsLoading]);

  const [firstItemRef] = useInView({
    threshold: 0.1,
    delay: 100,
    onChange: (inView) => {
      if (isInViewFirstRender.current) {
        isInViewFirstRender.current = false;
        return;
      }
      if (inView && !newsLoading) {
        const container = containerRef.current;
        if (!container) return;

        const oldScrollHeight = container.scrollHeight;
        const oldScrollTop = container.scrollTop;

        // Create mutation observer before fetching
        const observer = new MutationObserver(() => {
          const newScrollHeight = container.scrollHeight;
          const heightDiff = newScrollHeight - oldScrollHeight;

          // Adjust scroll position to prevent jump
          container.scrollTop = oldScrollTop + heightDiff;
          observer.disconnect();
        });
        // Start observing before fetch
        observer.observe(container, { childList: true, subtree: true });

        onScroll(Direction.PREV);
        isInViewFirstRender.current = true;
      }
    },
  });

  const [lastItemRef] = useInView({
    threshold: 0.1,
    delay: 100,
    onChange: (inView) => {
      if (isInViewFirstRender.current) {
        isInViewFirstRender.current = false;
        return;
      }
      if (inView && !newsLoading) {
        onScroll(Direction.NEXT);
        isInViewFirstRender.current = true;
      }
    },
  });

  return {
    firstItemRef,
    lastItemRef,
    selectedItemRef,
  };
};
