import React, { FC, useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core';

function isScrollEnd(element: HTMLDivElement) {
  return (element.scrollTop + element.clientHeight) === element.scrollHeight;
}

const useStyles = makeStyles({
  root: {
    overflow: 'auto',
    position: 'relative',
  }
});

interface IProps {
  onScrollEnd: () => any;
}

const InfinitScroll: FC<IProps> = ({ children, onScrollEnd}) => {
  const classes = useStyles();
  const scrollList = useRef<HTMLDivElement>(null);


  const handleScroll = useCallback(() => {
    if (scrollList.current !== null) {
      if (isScrollEnd(scrollList.current)) {
        onScrollEnd();
      }
    }
  }, [scrollList, onScrollEnd]);
  
  useEffect(() => {
    if (scrollList.current) {
      scrollList.current.addEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  return (
    <div ref={scrollList} className={classes.root}>
      {children}
    </div>
  )
};

export default InfinitScroll;