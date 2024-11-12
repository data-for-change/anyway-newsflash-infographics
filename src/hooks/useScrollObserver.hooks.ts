import { useCallback, useEffect, useRef } from 'react';

export enum Direction {
  PREV = 'PREV',
  NEXT = 'NEXT',
}

interface IProps {
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onFetch: (direction: Direction) => void;
}

export const useScrollObserver = ({ onFetch, loading, currentPage, totalPages }: IProps) => {
  const topObserver = useRef<IntersectionObserver>();
  const bottomObserver = useRef<IntersectionObserver>();
  const containerRef = useRef<HTMLDivElement>(null);
  const prevHeightRef = useRef<number>(0);
  const hasScrolledDown = useRef(false);

  // Track scroll direction
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      hasScrolledDown.current = scrollTop > lastScrollTop;
      lastScrollTop = scrollTop;
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrevFetch = useCallback(() => {
    // Only fetch prev if we've scrolled down before
    if (!hasScrolledDown.current) return;

    if (containerRef.current) {
      prevHeightRef.current = containerRef.current.scrollHeight;
    }

    onFetch(Direction.PREV);

    setTimeout(() => {
      if (containerRef.current) {
        const newHeight = containerRef.current.scrollHeight;
        const heightDiff = newHeight - prevHeightRef.current;
        containerRef.current.scrollTop = heightDiff;
      }
    }, 100);
  }, [onFetch]);

  const firstElementRef = useCallback(
    (node: HTMLDivElement) => {
      //Return if already fetching
      if (loading || !node) return;

      // Disconnect if already observer exists
      if (topObserver.current) topObserver.current.disconnect();

      //Create new observer for the last element, and call fetchNextPage if visible(isIntersecting)
      topObserver.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && currentPage < totalPages) {
            handlePrevFetch();
          }
        },
        {
          root: null,
          rootMargin: '100px',
          threshold: 0.1,
        },
      );

      if (node) {
        topObserver.current.observe(node);
      }
    },
    [currentPage, loading, handlePrevFetch, totalPages],
  );

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || !node) return;
      if (bottomObserver.current) bottomObserver.current.disconnect();

      bottomObserver.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && currentPage > 1) {
            onFetch(Direction.NEXT);
          }
        },
        {
          root: null,
          rootMargin: '100px',
          threshold: 0.1,
        },
      );

      if (node) {
        bottomObserver.current.observe(node);
      }
    },
    [currentPage, loading, onFetch],
  );

  return { lastElementRef, firstElementRef, containerRef };
};
