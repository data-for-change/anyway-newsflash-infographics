import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../models/WidgetData';
import { Text, TextType } from '../atoms';
import { Theme, makeStyles } from '@material-ui/core';
import { highlightAlertColor, borderColor } from '../../style';
import RoadNumberImage from '../../services/get-road-image.service';
import { useTranslation } from 'react-i18next';
import Person from '../../assets/Person.png';
import Ambulance from '../../assets/Ambulance.png';
import Crutches from '../../assets/Crutches.png';
import Box from '@material-ui/core/Box';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
  roadNumber: number;
}
interface AProps {
  accidentsCount: Number;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    height: '100%',
    justifyContent: 'space-evenly',
    letterSpacing: 1,
  },
  mainText: {
    fontSize: 19,
    '& span': {
      marginLeft: 10,
    },
  },
  bottomText: {
    fontSize: 22,
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
  },
  border: {
    borderBottom: `5px solid ${borderColor}`,
  },
  image: {
    height: '60px',
    width: 'auto',
  },
  highlightAlert: {
    color: highlightAlertColor,
  },
}));
const AccidentsOccurred: FC<AProps> = ({ accidentsCount }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const elements = [
    <span key={1}>{t('textView.occurred')}</span>,
    <span key={2} className={classes.highlightAlert}>
      {accidentsCount}
    </span>,
    <span key={3}>{t('textView.accidents')}</span>,
  ];
  // When the locale is English the last element needs to be first - x accidents occurred instead of occurred x accidents
  const [a, b, c] = elements;
  const elementsEnglish = [b, c, a];
  return i18n.language === 'he' ? <>{elements}</> : <>{elementsEnglish}</>;
};

const TextView: FC<IProps> = ({ data, segmentText, roadNumber }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { items } = data;
  //checking availability of two or more types
  const isSummaryText =
    [items.severity_fatal_count, items.severity_light_count, items.severity_severe_count].filter(Boolean).length >= 2;
  return (
    <div className={classes.root}>
      <RoadNumberImage roadNumber={roadNumber} />
      <Text type={TextType.WIDGET_TITLE}>
        <span className={classes.mainText}>
          {items.end_year === items.start_year ? (
            <>
              <span>{t('textView.inYear')}</span>
              <span>{items.end_year}</span>{' '}
            </>
          ) : (
            <>
              <span>{t('textView.betweenYears')}</span>
              <span>
                {items.end_year} - {items.start_year}{' '}
              </span>{' '}
            </>
          )}
          <br />
          <span>{t('textView.on') + segmentText}</span>
          <AccidentsOccurred accidentsCount={items.total_accidents_count} />
        </span>
      </Text>
      <div>
        {isSummaryText ? (
          <>
            <Text type={TextType.WIDGET_CONTENT}>
              {items.severity_fatal_count ? (
                <Box display="flex" justifyContent="center" pt={1} pb={1} className={classes.border}>
                  <Box width="40%">
                    <img src={Person} className={classes.image} alt="red person" />
                  </Box>
                  <span className={classes.bottomText}>
                    <span className={classes.highlightAlert}>{items.severity_fatal_count}</span>
                    <span>
                      {items.severity_fatal_count > 1 ? t('textView.fatal.plural') : t('textView.fatal.singular')}
                    </span>
                  </span>
                </Box>
              ) : null}
            </Text>
            <Text type={TextType.WIDGET_CONTENT}>
              {items.severity_severe_count ? (
                <Box display="flex" justifyContent="center" pt={1} pb={1} className={classes.border}>
                  <Box width="40%">
                    <img src={Ambulance} className={classes.image} alt="ambulance" />
                  </Box>
                  <span className={classes.bottomText}>
                    <span className={classes.highlightAlert}>{items.severity_severe_count}</span>
                    {items.severity_severe_count > 1 ? t('textView.severe.plural') : t('textView.severe.singular')}
                  </span>
                </Box>
              ) : null}
            </Text>
            <Text type={TextType.WIDGET_CONTENT}>
              {items.severity_light_count ? (
                <Box display="flex" justifyContent="center" pt={1} pb={1}>
                  <Box width="40%">
                    <img src={Crutches} className={classes.image} alt="crutches" />
                  </Box>
                  <span className={classes.bottomText}>
                    <span className={classes.highlightAlert}>{items.severity_light_count}</span>
                    {items.severity_light_count > 1 ? t('textView.light.plural') : t('textView.light.singular')}
                  </span>
                </Box>
              ) : null}
            </Text>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default TextView;
