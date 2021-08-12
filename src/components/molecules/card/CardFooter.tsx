import React from 'react';
import { Logo, Typography } from '../../atoms';
import LamasImage from '../../../assets/cbs.png';
import AnywayImage from '../../../assets/anyway.png';
import { makeStyles } from '@material-ui/core/styles';
import { cardFooterHeight } from '../../../style';
import { useLocaleValue } from '../../../hooks/date.hooks';
import { dateFormat } from '../../../utils/time.utils';
import { Box } from '@material-ui/core';

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
});

const CardFooter: React.FC<IProps> = ({ dateComment }) => {
  const classes = useStyles();
  let locale = useLocaleValue();
  let temp_dates_comment = dateComment.split(' ');
  temp_dates_comment[3] = dateFormat(temp_dates_comment[3], locale);
  dateComment = temp_dates_comment.join(' ');

  return (
    <div className={classes.main}>
      <Typography.Body3>{dateComment}</Typography.Body3>
      <Box display="flex" flex={1} />
      <Logo src={LamasImage} alt={'Lamas'} height={30} />
      <Logo src={AnywayImage} alt={'Anyway'} height={20} />
    </div>
  );
};

export default CardFooter;
