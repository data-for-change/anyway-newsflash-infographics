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
import { observer } from 'mobx-react-lite';
interface IProps {
  dateComment: IDateComments;
  showRange: boolean;
  orgIconPath?: string;
}

const useStyles = makeStyles(theme => ({
  main: {
    width: '100%',
    display: 'flex',
    boxSizing: 'border-box',
    height: cardFooterHeight,
    alignItems: 'flex-end',
    justifyContent:'space-between'
  },

  logoBox:{
    display:'flex',
    gap: theme.spacing(1),
  }
}));

const CardFooter: React.FC<IProps> = ({ dateComment, showRange,orgIconPath }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const locale = useLocale();
  const lastUpdateDate = dateComment.last_update ? dateFormat(new Date(dateComment.last_update), locale) : null;
  const dateRange = dateComment.date_range ? dateComment.date_range.join('-') : null;

  return (
    <div className={classes.main}>
      <Box>
      {showRange && <Typography.Body3>{dateRange},</Typography.Body3>}
      {lastUpdateDate && (
        <Typography.Body3>
          <Box px={1} component="span">
            {t('widgets.lastDateUpdated')}:
          </Box>
          {lastUpdateDate}
        </Typography.Body3>
      )}
      </Box>
      <Box className={classes.logoBox}>
      <Logo src={AnywayImage} alt={'Anyway'} height={orgIconPath ? 20 : 22} />
      <Logo src={  orgIconPath ||  LamasImage} alt={'Lamas'} height={orgIconPath ? 24 : 25}  />
      </Box>
    </div>
  );
};

export default observer(CardFooter);
