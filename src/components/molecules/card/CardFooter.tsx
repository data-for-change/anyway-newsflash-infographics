import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnywayImage from 'assets/anyway.png';
import LamasImage from 'assets/cbs.png';
import { Logo, Typography } from 'components/atoms';
import { IDateComments } from 'models/WidgetData';
import { useTranslation } from 'react-i18next';
import { dateFormat } from 'utils/time.utils';
import { useLocale } from 'hooks/date.hooks';
import React from 'react';
import { cardFooterHeight } from 'style';

const PREFIX = 'CardFooter';

const classes = {
  main: `${PREFIX}-main`,
};

const Root = styled('div')({
  [`&.${classes.main}`]: {
    width: '100%',
    display: 'flex',
    boxSizing: 'border-box',
    height: cardFooterHeight,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});

interface IProps {
  dateComment: IDateComments;
}

const CardFooter: React.FC<IProps> = ({ dateComment }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const lastUpdateDate = dateComment.last_update ? dateFormat(new Date(dateComment.last_update), locale) : null;
  const dateRange = dateComment.date_range ? dateComment.date_range.join('-') : null;
  return (
    <Root className={classes.main}>
      <Typography.Body3>{dateRange}</Typography.Body3>
      {lastUpdateDate && (
        <Typography.Body3>
          ,
          <Box px={1} component="span">
            {t('widgets.lastDateUpdated')}:
          </Box>
          {lastUpdateDate}
        </Typography.Body3>
      )}
      <Box display="flex" flex={1} />
      <Logo src={LamasImage} alt={'Lamas'} height={30} />
      <Logo src={AnywayImage} alt={'Anyway'} height={20} />
    </Root>
  );
};

export default CardFooter;
