import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../models/WidgetData';
import { Text, TextType } from '../atoms';
import { Theme, makeStyles } from '@material-ui/core';
import { borderColor, roadIconColors } from '../../style';
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
  },
  border: {
    borderBottom: `5px solid ${borderColor}`,
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
      {t('textView.occurred')}
    </Box>,
    <Box mr={1} key={2} color={red}>
      {accidentsCount}
    </Box>,
    <Box mr={1} key={3}>
      {t('textView.accidents')}
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
      <Text type={TextType.WIDGET_TITLE}>
        <Box textAlign="center" fontSize={24} fontWeight={700}>
          {items.end_year === items.start_year ? (
            <>
              <Box mr={1}>{t('textView.inYear')}</Box>
              <Box mr={1}>{items.end_year}</Box>{' '}
            </>
          ) : (
            <>
              <Box mr={1}>{t('textView.betweenYears')}</Box>
              <Box mr={1}>
                {items.end_year} - {items.start_year}{' '}
              </Box>{' '}
            </>
          )}
          <Box mr={1}>{t('textView.on') + segmentText}</Box>
          <AccidentsOccurred accidentsCount={items.total_accidents_count} />
        </Box>
      </Text>
      <Box px={3}>
        {isSummaryText ? (
          <>
            <Text type={TextType.WIDGET_CONTENT}>
              {items.severity_fatal_count ? (
                <Box display="flex" py={1} className={classes.border}>
                  <Box flex={1} display="flex" justifyContent="center">
                    <img src={Person} className={classes.image} alt="red person" />
                  </Box>
                  <Box flex={1} display="flex" justifyContent="center">
                    <Box display="flex" fontSize={32} flexDirection="column" alignItems="center">
                      <Box color={red}>{items.severity_fatal_count}</Box>
                      <span>
                        {items.severity_fatal_count > 1 ? t('textView.fatal.plural') : t('textView.fatal.singular')}
                      </span>
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Text>
            <Text type={TextType.WIDGET_CONTENT}>
              {items.severity_severe_count ? (
                <Box display="flex" py={1} className={classes.border}>
                  <Box flex={1} display="flex" justifyContent="center">
                    <img src={Ambulance} className={classes.image} alt="ambulance" />
                  </Box>
                  <Box flex={1} display="flex" justifyContent="center">
                    <Box display="flex" fontSize={32} flexDirection="column" alignItems="center">
                      <Box color={red}>{items.severity_severe_count}</Box>
                      {items.severity_severe_count > 1 ? t('textView.severe.plural') : t('textView.severe.singular')}
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Text>
            <Text type={TextType.WIDGET_CONTENT}>
              {items.severity_light_count ? (
                <Box display="flex" py={1}>
                  <Box flex={1} display="flex" justifyContent="center">
                    <img src={Crutches} className={classes.image} alt="crutches" />
                  </Box>
                  <Box flex={1} display="flex" justifyContent="center">
                    <Box display="flex" fontSize={32} flexDirection="column" alignItems="center">
                      <Box color={red}>{items.severity_light_count}</Box>
                      {items.severity_light_count > 1 ? t('textView.light.plural') : t('textView.light.singular')}
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Text>
          </>
        ) : null}
      </Box>
    </div>
  );
};
export default TextView;
