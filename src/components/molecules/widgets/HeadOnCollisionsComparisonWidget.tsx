import React, { FC } from 'react';
import { Text, TextType } from '../../atoms';
import PieChartView from '../PieChartView';
import { IWidgetHeadOnCollisionsComparisonData } from '../../../models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { cardContentHeight, highlightBasicColor } from '../../../style';
import { useTranslation } from 'react-i18next';

const ACCIDENT_TYPE = 'desc';
const COUNT = 'count';
const MAIN_CONTENT_HEIGHT = 250;
const SECONDARY_CONTENT_HEIGHT = cardContentHeight - MAIN_CONTENT_HEIGHT;

interface IProps {
  data: IWidgetHeadOnCollisionsComparisonData;
  segmetText: string;
  usePercent?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  textHighlight: {
    backgroundColor: highlightBasicColor,
    textAlign: 'center',
  },
}));

const HeadOnCollisionsComparisonWidget: FC<IProps> = ({ data, segmetText, usePercent }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const bigPieData = data.items.specific_road_segment_fatal_accidents;
  const smallPieData = data.items.all_roads_fatal_accidents;
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" height={MAIN_CONTENT_HEIGHT} width={'100%'}>
        <Box flexBasis={120} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <span className={classes.textHighlight}>{segmetText}</span>
        </Box>
        <PieChartView data={bigPieData} xLabel={ACCIDENT_TYPE} yLabel={COUNT} usePercent={usePercent} />
      </Box>
      <Box display="flex" height={SECONDARY_CONTENT_HEIGHT} width={'100%'}>
        <PieChartView data={smallPieData} xLabel={ACCIDENT_TYPE} yLabel={COUNT} usePercent={usePercent} />
        <Box flexBasis={280} display="flex" alignItems="center">
          <span className={classes.textHighlight}>
            <Text type={TextType.CONTENT}>{t('onUrban')}</Text>
          </span>
        </Box>
      </Box>
    </Box>
  );
};
export default HeadOnCollisionsComparisonWidget;
