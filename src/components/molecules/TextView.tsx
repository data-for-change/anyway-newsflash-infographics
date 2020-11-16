import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../models/WidgetData';
import { Typography } from '../atoms';
import { Theme, makeStyles } from '@material-ui/core';
import { silverSmokeColor, roadIconColors, shadowColor } from '../../style';
import { useTranslation } from 'react-i18next';
import Person from '../../assets/Person.png';
import Ambulance from '../../assets/Ambulance.png';
import Crutches from '../../assets/Crutches.png';
import Box from '@material-ui/core/Box';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
}
interface AProps {
  accidentsCount: Number;
}

const red = roadIconColors.red;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-evenly',
    letterSpacing: 1,
    padding: `0 ${theme.spacing(6)}px`,
  },
  border: {
    borderBottom: `5px solid ${silverSmokeColor}`,
  },
  image: {
    height: theme.spacing(11),
    width: 'auto',
  },
}));

const AccidentsOccurred: FC<AProps> = ({ accidentsCount }) => {
  const { t, i18n } = useTranslation();
  const elements = [
    <Box mr={1} key={1}>
      <Typography.Body1>{t('textView.occurred')}</Typography.Body1>
    </Box>,
    <Box mr={1} key={2} color={red}>
      {accidentsCount}
    </Box>,
    <Box mr={1} key={3}>
      <Typography.Body1>{t('textView.accidents')}</Typography.Body1>
    </Box>,
  ];
  // When the locale is English the last element needs to be first - x accidents occurred instead of occurred x accidents
  const [a, b, c] = elements;
  const elementsEnglish = [b, c, a];
  return (
    <Box display="flex" justifyContent="center">
      {i18n.language === 'he' ? elements : elementsEnglish}
    </Box>
  );
};

const TextView: FC<IProps> = ({ data, segmentText }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { items } = data;
  //checking availability of two or more types
  const isSummaryText =
    [items.severity_fatal_count, items.severity_light_count, items.severity_severe_count].filter(Boolean).length >= 2;
  return (
    <div className={classes.root}>
      <Box color={shadowColor} textAlign="center">
        {items.end_year === items.start_year ? (
          <>
            <Box mr={1}>
              <Typography.Body1>{t('textView.inYear')}</Typography.Body1>
            </Box>
            <Box mr={1}>
              <Typography.Body1>{items.end_year}</Typography.Body1>
            </Box>{' '}
          </>
        ) : (
          <>
            <Box mr={1}>
              <Typography.Body1>{t('textView.betweenYears')}</Typography.Body1>
            </Box>
            <Box mr={1}>
              <Typography.Body1>
                {items.end_year} - {items.start_year}{' '}
              </Typography.Body1>
            </Box>{' '}
          </>
        )}
        <Box mr={1}>
          <Typography.Body1>{t('textView.on') + segmentText}</Typography.Body1>
        </Box>
        <AccidentsOccurred accidentsCount={items.total_accidents_count} />
      </Box>
      <Box color="text.secondary" px={6}>
        {isSummaryText ? (
          <>
            {items.severity_fatal_count ? (
              <Box display="flex" py={1} className={classes.border}>
                <Box flex={1} display="flex" justifyContent="center">
                  <img src={Person} className={classes.image} alt="red person" />
                </Box>
                <Box flex={1} display="flex" justifyContent="center">
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Box color={red}>
                      <Typography.Title1>{items.severity_fatal_count}</Typography.Title1>
                    </Box>
                    <span>
                      {items.severity_fatal_count > 1 ? (
                        <Typography.Title1>{t('textView.fatal.plural')}</Typography.Title1>
                      ) : (
                        <Typography.Title1>{t('textView.fatal.singular')}</Typography.Title1>
                      )}
                    </span>
                  </Box>
                </Box>
              </Box>
            ) : null}
            {items.severity_severe_count ? (
              <Box display="flex" py={1} className={classes.border}>
                <Box flex={1} display="flex" justifyContent="center">
                  <img src={Ambulance} className={classes.image} alt="ambulance" />
                </Box>
                <Box flex={1} display="flex" justifyContent="center">
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Box color={red}>
                      <Typography.Title1>{items.severity_severe_count}</Typography.Title1>
                    </Box>
                    {items.severity_severe_count > 1 ? (
                      <Typography.Title1>{t('textView.severe.plural')}</Typography.Title1>
                    ) : (
                      <Typography.Title1>{t('textView.severe.singular')}</Typography.Title1>
                    )}
                  </Box>
                </Box>
              </Box>
            ) : null}
            {items.severity_light_count ? (
              <Box display="flex" py={1}>
                <Box flex={1} display="flex" justifyContent="center">
                  <img src={Crutches} className={classes.image} alt="crutches" />
                </Box>
                <Box flex={1} display="flex" justifyContent="center">
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Box color={red}>
                      <Typography.Title1>{items.severity_light_count}</Typography.Title1>
                    </Box>
                    {items.severity_light_count > 1 ? (
                      <Typography.Title1>{t('textView.light.plural')}</Typography.Title1>
                    ) : (
                      <Typography.Title1>{t('textView.light.singular')}</Typography.Title1>
                    )}
                  </Box>
                </Box>
              </Box>
            ) : null}
          </>
        ) : null}
      </Box>
    </div>
  );
};
export default TextView;
