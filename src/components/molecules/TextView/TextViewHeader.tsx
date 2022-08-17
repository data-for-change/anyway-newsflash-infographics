import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import { roadIconColors } from 'style';
import { Typography } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { IWidgetCountBySeverityTextDataBase } from 'models/WidgetData';
import { makeStyles } from '@material-ui/core/styles';
import { ITextViewLabels } from './TextView';
import { LANG } from 'const/languages.const';

interface IProps {
  data: IWidgetCountBySeverityTextDataBase;
  segmentText: string;
  singleType: string;
  totalCount: number;
  labels: ITextViewLabels;
  isStreet: boolean;
}
interface AProps {
  accidentsCount: Number;
  singleType: string;
  labels: ITextViewLabels;
}

const useStyles = makeStyles((theme) => ({
  numOfAcc: {
    position: 'relative',
    bottom: theme.spacing(2),
    color: roadIconColors.red,
    marginRight: theme.spacing(1),
  },
}));

const AccidentsOccurred: FC<AProps> = ({ accidentsCount, singleType, labels }) => {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const elements = [
    <Box mr={1} key={1}>
      <Typography.Body1>{t(`textView.${labels.verb}`)}</Typography.Body1>
    </Box>,
    <Typography.Title1 key={2} bold>
      <Box className={classes.numOfAcc}>{accidentsCount}</Box>
    </Typography.Title1>,
    <Box mr={1} key={3}>
      <Typography.Body1>{t(`textView.${labels.noun}`)}</Typography.Body1>
    </Box>,
    singleType && (
      <Box mr={1} key={4}>
        <Typography.Body1>
          {accidentsCount > 1 ? t(`textView.${singleType}.plural`) : t(`textView.${singleType}.singular`)}{' '}
        </Typography.Body1>
      </Box>
    ),
  ];
  // When the locale is English the last element needs to be first - x accidents occurred instead of occurred x accidents
  const [a, b, c, d] = elements;
  const elementsEnglish = [b, d, c, a];
  return (
    <Box display="flex" justifyContent="center">
      {i18n.language === LANG.HE ? elements : elementsEnglish}
    </Box>
  );
};

const TextViewHeader: React.FC<IProps> = ({ data: { items }, segmentText, singleType, totalCount, labels, isStreet }) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      {items.end_year === items.start_year ? (
        <Box mb={1}>
          <Typography.Body1>{t('textView.inYear')} </Typography.Body1>
          <Typography.Body1>{items.end_year}</Typography.Body1>
        </Box>
      ) : (
        <Box mb={1}>
          <Typography.Body1>{t('textView.inYears')} </Typography.Body1>
          <Typography.Body1>
            {items.start_year} - {items.end_year}
          </Typography.Body1>
        </Box>
      )}
      <Box mb={1}>
        <Typography.Body1>{`
        ${isStreet ? t('textView.on') : t('textView.onSegment')  + ' '}${
          i18n.language === LANG.EN ? ' ' : ''
        }${segmentText}`}</Typography.Body1>
      </Box>
      <Box>
        <AccidentsOccurred singleType={singleType} accidentsCount={totalCount} labels={labels} />
      </Box>
    </>
  );
};

export default TextViewHeader;
