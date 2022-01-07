import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Typography } from 'components/atoms';
import { IWidgetCountBySeverityTextData } from 'models/WidgetData';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { roadIconColors } from 'style';
import { LANG } from 'const/languages.const';

const PREFIX = 'TextViewHeader';

const classes = {
  numOfAcc: `${PREFIX}-numOfAcc`,
};

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.numOfAcc}`]: {
    position: 'relative',
    bottom: theme.spacing(2),
    color: roadIconColors.red,
    marginRight: theme.spacing(1),
  },
}));

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
  singleType: string;
}
interface AProps {
  accidentsCount: Number;
  singleType: string;
}

const AccidentsOccurred: FC<AProps> = ({ accidentsCount, singleType }) => {
  const { t, i18n } = useTranslation();

  const elements = [
    <Box mr={1} key={1}>
      <Typography.Body1>{t('textView.occurred')}</Typography.Body1>
    </Box>,
    <Typography.Title1 key={2} bold>
      <Box className={classes.numOfAcc}>{accidentsCount}</Box>
    </Typography.Title1>,
    <Box mr={1} key={3}>
      <Typography.Body1>{t('textView.accidents')}</Typography.Body1>
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

const TextViewHeader: React.FC<IProps> = ({ data: { items }, segmentText, singleType }) => {
  const { t, i18n } = useTranslation();
  return (
    <Root>
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
        <Typography.Body1>{`${t('textView.onSegment')} ${
          i18n.language === LANG.EN ? ' ' : ''
        }${segmentText}`}</Typography.Body1>
      </Box>
      <Box>
        <AccidentsOccurred singleType={singleType} accidentsCount={items.total_accidents_count} />
      </Box>
    </Root>
  );
};

export default TextViewHeader;
