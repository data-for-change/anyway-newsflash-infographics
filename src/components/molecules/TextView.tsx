import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../models/WidgetData';
import { Text, TextType } from '../atoms';
import { Theme, makeStyles } from '@material-ui/core';
import { highlightBasicColor, highlightDarkColor, highlightAlertColor, highlightWarnColor } from '../../style';
import RoadNumberImage from '../../services/get-road-image.service';
import { useTranslation } from 'react-i18next';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
  roadNumber: number;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-evenly',
    letterSpacing: 1,
    '& span': {
      marginLeft: 10,
    },
  },
  mainText: {
    fontSize: 19,
    lineHeight: '32px',
    padding: '5px',
    backgroundColor: highlightBasicColor,
  },
  bottomText: {
    fontSize: 22,
    padding: '5px 0 5px 5px',
    backgroundColor: highlightBasicColor,
  },
  highlightDark: {
    padding: '5px',
    color: highlightBasicColor,
    backgroundColor: highlightDarkColor,
  },
  highlightAlert: {
    padding: '5px',
    backgroundColor: highlightAlertColor,
  },
  highlightWarn: {
    padding: '5px',
    backgroundColor: highlightWarnColor,
  },
}));
const TextView: FC<IProps> = ({ data, segmentText, roadNumber }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { items } = data;
  const accidentsOccurredEls = [
    <span>{t('textView.occurred')}</span>,
    <span className={classes.highlightDark}>{items.total_accidents_count}</span>,
    <span>{t('textView.accidents')}</span>,
  ];
  const [a, b, c] = accidentsOccurredEls;
  const accidentsOccurredElsEn = [b, c, a];
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
          {i18n.language === 'he' ? accidentsOccurredEls : accidentsOccurredElsEn}
        </span>
      </Text>
      <div>
        {isSummaryText ? (
          <>
            <Text type={TextType.WIDGET_CONTENT}>
              {items.severity_fatal_count ? (
                <span className={classes.bottomText}>
                  <span className={classes.highlightAlert}>{items.severity_fatal_count}</span>
                  <span>
                    {items.severity_fatal_count > 1 ? t('textView.fatal.plural') : t('textView.fatal.singular')}
                  </span>
                </span>
              ) : null}
            </Text>
            <Text type={TextType.WIDGET_CONTENT}>
              {items.severity_severe_count ? (
                <span className={classes.bottomText}>
                  <span className={classes.highlightWarn}>
                    {items.severity_light_count ? null : <span>{t('textView.and')}</span>}
                    {items.severity_severe_count}
                  </span>
                  <span>
                    {items.severity_severe_count > 1 ? t('textView.severe.plural') : t('textView.severe.singular')}
                  </span>
                </span>
              ) : null}
            </Text>
            <Text type={TextType.WIDGET_CONTENT}>
              {items.severity_light_count ? (
                <span className={classes.bottomText}>
                  <span>
                    {items.severity_fatal_count || items.severity_severe_count ? (
                      <span>{t('textView.and')}</span>
                    ) : null}
                    {items.severity_light_count}
                  </span>
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
