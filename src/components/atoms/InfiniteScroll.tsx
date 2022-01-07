import { styled } from '@mui/material/styles';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useStore } from 'store/storeConfig';

const PREFIX = 'InfiniteScroll';

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    overflow: 'auto',
    position: 'relative',
  },
});

const INFINITE_SCROLLING_OFFSET: number = 30;

function isScrollEnd(element: HTMLDivElement) {
  return element.scrollTop + element.clientHeight > element.scrollHeight - INFINITE_SCROLLING_OFFSET;
}

interface IProps {
  onScrollEnd: () => any;
}

const InfiniteScroll: FC<IProps> = ({ children, onScrollEnd }) => {
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
    <Root ref={scrollList} className={classes.root}>
      {children}
    </Root>
  );
};

export default InfiniteScroll;
