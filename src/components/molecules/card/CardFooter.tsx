import React from 'react';
import { Logo, Typography } from 'components/atoms';
import LamasImage from 'assets/cbs.png';
import AnywayImage from 'assets/anyway.png';
import { makeStyles } from '@material-ui/core/styles';
import { cardFooterHeight } from 'style';
import { Box } from '@material-ui/core';
import { IDateComments } from 'models/WidgetData';
import { useTranslation } from 'react-i18next';
import { dateFormat } from 'utils/time.utils';
import { useLocale } from 'hooks/date.hooks';

interface IProps {
  dateComment: IDateComments;
}

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    display: 'flex',
    boxSizing: 'border-box',
    height: cardFooterHeight,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  lastUpdateDate: {
    paddingInlineStart: theme.spacing(1),
  },
}));

const CardFooter: React.FC<IProps> = ({ dateComment }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const locale = useLocale();
  const lastUpdateDate = dateComment.last_update ? dateFormat(new Date(dateComment.last_update), locale) : null;
  const dateRange = dateComment.date_range ? dateComment.date_range.join('-') : null;
  return (
    <div className={classes.main}>
      <Typography.Body3>
        {dateRange}
        {lastUpdateDate && <span>,</span>}
      </Typography.Body3>
      {lastUpdateDate && (
        <Typography.Body3>
          <Box className={classes.lastUpdateDate}>
            {t('widgets.lastDateUpdated')}:<span className={classes.lastUpdateDate}>{lastUpdateDate}</span>
          </Box>
        </Typography.Body3>
      )}
      <Box display="flex" flex={1} />
      <Logo src={LamasImage} alt={'Lamas'} height={30} />
      <Logo src={AnywayImage} alt={'Anyway'} height={20} />
    </div>
  );
};

export default CardFooter;
