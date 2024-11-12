// InfiniteScroll.tsx
import { FC, UIEventHandler, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const TOP_THRESHOLD = 20; // Smaller threshold for top
const BOTTOM_THRESHOLD = 100; // Larger threshold for bottom
const INFINITE_SCROLLING_OFFSET: number = 30;

function isScrollEnd(element: HTMLDivElement) {
  return element.scrollTop + element.clientHeight > element.scrollHeight - INFINITE_SCROLLING_OFFSET;
}
const useStyles = makeStyles({
  root: {
    overflow: 'auto',
    position: 'relative',
    height: '100%',
  },
});

export enum Direction {
  PREV = 'PREV',
  NEXT = 'NEXT',
}

interface InfiniteScrollProps {
  children: React.ReactNode;
  onScroll: (direction: Direction) => void;
  loading?: boolean;
}

const InfiniteScroll: FC<InfiniteScrollProps> = ({ children, onScroll, loading = false }) => {
  const classes = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  const hasScrolledDown = useRef(false);
  const initialLoading = useRef(true);

  // const handleScroll = useCallback(
  //   (e) => {
  //     if (initialLoading.current) {
  //       initialLoading.current = false;
  //       return;
  //     }
  //     if (!e || loading) return;

  //     const { scrollTop, scrollHeight, clientHeight } = e.target;

  //     // Track scroll direction
  //     const direction: Direction = scrollTop > lastScrollTop.current ? Direction.NEXT : Direction.PREV;
  //     lastScrollTop.current = scrollTop;

  //     // Only set hasScrolledDown when actually scrolling down
  //     if (direction === Direction.NEXT && scrollTop > TOP_THRESHOLD) {
  //       hasScrolledDown.current = true;
  //     }

  //     // Near bottom - load more (larger threshold)
  //     if (scrollHeight - scrollTop - clientHeight <= BOTTOM_THRESHOLD) {
  //       onScroll(Direction.NEXT);
  //     }

  //     // Near top - load previous (smaller threshold)
  //     if (scrollTop <= TOP_THRESHOLD && hasScrolledDown.current) {
  //       onScroll(Direction.PREV);
  //     }
  //   },
  //   [loading, onScroll],
  // );
  const BUFFER_OFFSET = 500;
  const handleScroll = useCallback(
    (e) => {
      if (initialLoading.current) {
        initialLoading.current = false;
        return;
      }
      if (!e || loading) return;

      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const scrollOffset = scrollTop;
      const totalSize = scrollHeight;

      // Track direction
      const direction: Direction = scrollTop > lastScrollTop.current ? Direction.NEXT : Direction.PREV;
      lastScrollTop.current = scrollTop;

      // Enable prev loading after scroll down
      if (direction === Direction.NEXT) {
        hasScrolledDown.current = true;
      }

      // Load more at bottom
      if (scrollOffset > totalSize - clientHeight - BUFFER_OFFSET) {
        onScroll(Direction.NEXT);
      }

      // Load previous at top
      if (scrollOffset < BUFFER_OFFSET && hasScrolledDown.current) {
        onScroll(Direction.PREV);
      }
    },
    [loading, onScroll],
  );

  return (
    <div ref={containerRef} className={classes.root} onScroll={handleScroll}>
      {children}
    </div>
  );
};

export default InfiniteScroll;
