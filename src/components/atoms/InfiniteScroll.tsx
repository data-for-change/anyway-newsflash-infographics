import React, { FC, useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { useStore } from 'store/storeConfig';

const INFINITE_SCROLLING_OFFSET: number = 30;

function isScrollEnd(element: HTMLDivElement) {
  return element.scrollTop + element.clientHeight > element.scrollHeight - INFINITE_SCROLLING_OFFSET;
}

const useStyles = makeStyles({
  root: {
    overflow: 'auto',
    position: 'relative',
  },
});

interface IProps {
  onScrollEnd: () => any;
}

const InfiniteScroll: FC<IProps> = ({ children, onScrollEnd }) => {
  const classes = useStyles();
  const scrollList = useRef<HTMLDivElement>(null);
  const store = useStore();

  const handleScroll = useCallback(() => {
    if (scrollList.current !== null && !store.newsFlashLoading) {
      if (isScrollEnd(scrollList.current)) {
        onScrollEnd();
      }
    }
  }, [scrollList, onScrollEnd, store.newsFlashLoading]);

  useEffect(() => {
    if (scrollList.current) {
      scrollList.current.addEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div ref={scrollList} className={classes.root}>
      {children}
    </div>
  );
};

export default InfiniteScroll;
