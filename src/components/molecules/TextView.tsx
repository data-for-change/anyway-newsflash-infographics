import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../models/WidgetData';
import { Typography } from '../atoms';
import { Theme, makeStyles } from '@material-ui/core';
import { borderColor, roadIconColors, lighterWidgetText } from '../../style';
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
  singleType: string | undefined;
}
interface SProps {
  severity: string;
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
    borderBottom: `5px solid ${borderColor}`,
  },
  image: {
    height: theme.spacing(11),
    width: 'auto',
  },
}));

const AccidentsOccurred: FC<AProps> = ({ accidentsCount, singleType }) => {
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
    singleType && (
      <Box mr={1} key={4}>
        <Typography.Body1>
          {accidentsCount > 1 ? t(`textView.${singleType}.plural`) : t(`textView.${singleType}.plural`)}{' '}
        </Typography.Body1>
      </Box>
    ),
  ];
  // When the locale is English the last element needs to be first - x accidents occurred instead of occurred x accidents
  const [a, b, c, d] = elements;
  const elementsEnglish = [b, d, c, a];
  return (
    <Box display="flex" justifyContent="center">
      {i18n.language === 'he' ? elements : elementsEnglish}
    </Box>
  );
};

const SeverityImage: FC<SProps> = ({ severity }) => {
  const classes = useStyles();
  interface SeverityTypesImages {
    [index: string]: string;
  }
  const imgBySeverity: SeverityTypesImages = { fatal: Person, severe: Ambulance, light: Crutches };
  return (
    <Box flex={1} display="flex" justifyContent="center">
      <img src={imgBySeverity[severity]} className={classes.image} alt={imgBySeverity[severity]} />
    </Box>
  );
};

const TextView: FC<IProps> = ({ data, segmentText }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { items } = data;
  const { severity_fatal_count, severity_light_count, severity_severe_count } = items;
  const accidentTypesArr = [severity_fatal_count, severity_light_count, severity_severe_count];

  //checking availability of two or more types
  const isSummaryBreakdown = accidentTypesArr.filter(Boolean).length >= 2;
  // e.g. if there are only accidents types of severity_fatal_count will return the strinf "fatal"
  const findSingleType = () => {
    if (!isSummaryBreakdown) {
      for (const [key, value] of Object.entries(items)) {
        if (key.split('_')[0] === 'severity') {
          if (!value) {
            return;
          } else {
            return key.split('_')[1];
          }
        }
      }
    }
  };

  const singleType = findSingleType();

  return (
    <div className={classes.root}>
      <Box color={lighterWidgetText} textAlign="center">
        {items.end_year === items.start_year ? (
          <>
            <Typography.Body1>{t('textView.inYear')} </Typography.Body1>
            <Typography.Body1>{items.end_year}</Typography.Body1>
          </>
        ) : (
          <>
            <Typography.Body1>{t('textView.inYears')} </Typography.Body1>
            <Typography.Body1>
              {items.start_year} - {items.end_year}
            </Typography.Body1>
          </>
        )}
        <Box mr={1}>
          <Typography.Body1>{t('textView.on') + segmentText}</Typography.Body1>
        </Box>
        <AccidentsOccurred singleType={singleType} accidentsCount={items.total_accidents_count} />
      </Box>
      <Box color="text.secondary" px={6}>
        {isSummaryBreakdown ? (
          <>
            {severity_fatal_count ? (
              <Box display="flex" py={1} className={classes.border}>
                <SeverityImage severity="fatal" />
                <Box flex={1} display="flex" justifyContent="center">
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Box color={red}>
                      <Typography.Title1>{severity_fatal_count}</Typography.Title1>
                    </Box>
                    <span>
                      {severity_fatal_count > 1 ? (
                        <Typography.Title1>{t('textView.fatal.plural')}</Typography.Title1>
                      ) : (
                        <Typography.Title1>{t('textView.fatal.singular')}</Typography.Title1>
                      )}
                    </span>
                  </Box>
                </Box>
              </Box>
            ) : null}
            {severity_severe_count ? (
              <Box display="flex" py={1} className={classes.border}>
                <SeverityImage severity="severe" />
                <Box flex={1} display="flex" justifyContent="center">
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Box color={red}>
                      <Typography.Title1>{severity_severe_count}</Typography.Title1>
                    </Box>
                    {severity_severe_count > 1 ? (
                      <Typography.Title1>{t('textView.severe.plural')}</Typography.Title1>
                    ) : (
                      <Typography.Title1>{t('textView.severe.singular')}</Typography.Title1>
                    )}
                  </Box>
                </Box>
              </Box>
            ) : null}
            {severity_light_count ? (
              <Box display="flex" py={1}>
                <SeverityImage severity="light" />
                <Box flex={1} display="flex" justifyContent="center">
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Box color={red}>
                      <Typography.Title1>{severity_light_count}</Typography.Title1>
                    </Box>
                    {severity_light_count > 1 ? (
                      <Typography.Title1>{t('textView.light.plural')}</Typography.Title1>
                    ) : (
                      <Typography.Title1>{t('textView.light.singular')}</Typography.Title1>
                    )}
                  </Box>
                </Box>
              </Box>
            ) : null}
          </>
        ) : (
          singleType && <SeverityImage severity={singleType} />
        )}
      </Box>
    </div>
  );
};
export default TextView;
