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
  showRange: boolean;
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

const CardFooter: React.FC<IProps> = ({ dateComment, showRange }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const locale = useLocale();
  const lastUpdateDate = dateComment.last_update ? dateFormat(new Date(dateComment.last_update), locale) : null;
  const dateRange = dateComment.date_range ? dateComment.date_range.join('-') : null;
  return (
    <div className={classes.main}>
      {showRange && <Typography.Body3>{dateRange},</Typography.Body3>}
      {lastUpdateDate && (
        <Typography.Body3>
          <Box px={1} component="span">
            {t('widgets.lastDateUpdated')}:
          </Box>
          {lastUpdateDate}
        </Typography.Body3>
      )}
      <Box display="flex" flex={1} />
      <Logo src={LamasImage} alt={'Lamas'} height={30} />
      <Logo src={AnywayImage} alt={'Anyway'} height={20} />
    </div>
  );
};

export default CardFooter;
