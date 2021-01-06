import React, { FC } from 'react';
import Box from '@material-ui/core/Box';
import { roadIconColors } from '../../../style';
import { Typography } from '../../atoms';
import { useTranslation } from 'react-i18next';
import { IWidgetCountBySeverityTextData } from '../../../models/WidgetData';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
}
interface AProps {
  accidentsCount: Number;
}

const red = roadIconColors.red;

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

const TextViewHeader: React.FC<IProps> = ({ data: { items }, segmentText }) => {
  const { t } = useTranslation();
  return (
    <>
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
      <Box>
        <AccidentsOccurred accidentsCount={items.total_accidents_count} />
      </Box>
    </>
  );
};

export default TextViewHeader;
