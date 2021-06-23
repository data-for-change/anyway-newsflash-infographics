import React, { useEffect, useState } from 'react';
import { Logo, Typography } from '../../atoms';
import LamasImage from '../../../assets/cbs.png';
import AnywayImage from '../../../assets/anyway.png';
import { makeStyles } from '@material-ui/core/styles';
import { cardFooterHeight } from '../../../style';
import { Box } from '@material-ui/core';
import { useStore } from '../../../store/storeConfig';

interface IProps {
  dateComment: string;
}

const useStyles = makeStyles({
  main: {
    width: '100%',
    display: 'flex',
    boxSizing: 'border-box',
    height: cardFooterHeight,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  comment: {
    display: 'block',
  },
});

const CardFooter: React.FC<IProps> = ({ dateComment }) => {
  const classes = useStyles();
  const store = useStore();
  const [xPosition, setXPosition] = useState(300);
  useEffect(() => {
    setXPosition(store.currentLanguageRouteString === '/en' ? 0 : 300);
  }, [store.currentLanguageRouteString]);

  return (
    <div className={classes.main}>
      <Typography.Body3>
        <svg className={classes.comment} width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
          <text y="90%" x={xPosition}>
            {dateComment}
          </text>
        </svg>
      </Typography.Body3>
      <Box display="flex" flex={1} />
      <Logo src={LamasImage} alt={'Lamas'} height={30} />
      <Logo src={AnywayImage} alt={'Anyway'} height={20} />
    </div>
  );
};

export default CardFooter;
