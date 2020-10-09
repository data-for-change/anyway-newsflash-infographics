import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../models/WidgetData';
import { Text, TextType } from '../atoms';
import { Theme, makeStyles } from '@material-ui/core';
import { highlightAlertColor, borderColor } from '../../style';
import { useTranslation } from 'react-i18next';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
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
    '& span': {
      marginLeft: 10,
    },
  },
  mainText: {
    fontSize: 19,
  },
  bottomText: {
    fontSize: 22,
    display: 'flex',
    flexDirection: 'column',
  },
  border: {
    borderBottom: `5px solid ${borderColor}`,
  },

  highlightAlert: {
    color: highlightAlertColor,
  },
}));
const AccidentsOccurred: FC<AProps> = ({ accidentsCount }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const elements = [
    <span>{t('textView.occurred')}</span>,
    <span className={classes.highlightAlert}>{accidentsCount}</span>,
    <span>{t('textView.accidents')}</span>,
  ];
  // When the locale is English the last element needs to be first - x accidents occurred instead of occurred x accidents
  const [a, b, c] = elements;
  const elementsEnglish = [b, c, a];
  return i18n.language === 'he' ? <>{elements}</> : <>{elementsEnglish}</>;
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
                <span className={classes.bottomText}>
                  <span className={classes.highlightAlert}>{items.severity_fatal_count}</span>
                  <span className={classes.border}>
                    {items.severity_fatal_count > 1 ? t('textView.fatal.plural') : t('textView.fatal.singular')}
                  </span>
                </span>
              ) : null}
            </Text>
            <Text type={TextType.WIDGET_CONTENT}>
              {items.severity_severe_count ? (
                <span className={classes.bottomText}>
                  <span className={classes.highlightAlert}>{items.severity_severe_count}</span>
                  <span className={classes.border}>
                    {items.severity_severe_count > 1 ? t('textView.severe.plural') : t('textView.severe.singular')}
                  </span>
                </span>
              ) : null}
            </Text>
            <Text type={TextType.WIDGET_CONTENT}>
              {items.severity_light_count ? (
                <span className={classes.bottomText}>
                  <span className={classes.highlightAlert}>{items.severity_light_count}</span>
                  <span>
                    {items.severity_light_count > 1 ? t('textView.light.plural') : t('textView.light.singular')}
                  </span>
                </span>
              ) : null}
            </Text>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default TextView;
