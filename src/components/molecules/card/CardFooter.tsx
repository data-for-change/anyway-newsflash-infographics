import React from 'react';
import { Logo, Typography } from 'components/atoms';
import LamasImage from 'assets/cbs.png';
import AnywayImage from 'assets/anyway.png';
import { makeStyles } from '@material-ui/core/styles';
import { cardFooterHeight } from 'style';
import { Box } from '@material-ui/core';
import { IDateComments } from 'models/WidgetData';
import { useTranslation } from 'react-i18next';

interface IProps {
  dateComment: IDateComments;
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
  spaceSpan: {
    marginLeft: '4px',
    marginRight: '4px',
  },
});

const generateDate = (dateObj: any) => {
  const lastDate = new Date(dateObj);
  const year = lastDate.getFullYear();
  const day = lastDate.getDate();
  const month = lastDate.getMonth();

  return `${day}/${month + 1}/${year}`;
};

const CardFooter: React.FC<IProps> = ({ dateComment }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const lastDateUpdated = generateDate(dateComment.last_update);
  const dateRange = dateComment?.date_range?.join('-') ?? '';
  return (
    <div className={classes.main}>
      <Typography.Body3>{dateRange},</Typography.Body3>
      <Typography.Body5>
        <span className={classes.spaceSpan}>{t('widgets.lastDateUpdated')}:</span>
      </Typography.Body5>
      <Typography.Body3>{lastDateUpdated}</Typography.Body3>
      <Box display="flex" flex={1} />
      <Logo src={LamasImage} alt={'Lamas'} height={30} />
      <Logo src={AnywayImage} alt={'Anyway'} height={20} />
    </div>
  );
};

export default CardFooter;
