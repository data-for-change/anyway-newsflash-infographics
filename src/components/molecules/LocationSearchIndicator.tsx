import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Typography } from 'components/atoms';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { oceanBlueColor, secondaryBgColor } from 'style';

const PREFIX = 'LocationSearchIndicator';

const classes = {
  root: `${PREFIX}-root`,
};

const StyledBox = styled(Box)({
  [`&.${classes.root}`]: {
    color: oceanBlueColor,
    backgroundColor: secondaryBgColor,
  },
});

const LocationSearchIndicator: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledBox className={classes.root} display="flex" justifyContent="center" p={2}>
      <Typography.Body5>{t('locationIndicator')}</Typography.Body5>
    </StyledBox>
  );
};

export default LocationSearchIndicator;
