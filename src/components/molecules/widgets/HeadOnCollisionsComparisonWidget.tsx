import React, { FC } from 'react';
import { Text, TextType } from '../../atoms';
import PieChartView, {renderCollisionCustomizedLabel} from '../PieChartView';
import { IWidgetHeadOnCollisionsComparisonData } from '../../../models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import RoadNumberImage from '../../../services/get-road-image.service';
import { cardContentHeight } from '../../../style';
import { useTranslation } from 'react-i18next';

const ACCIDENT_TYPE = 'desc';
const COUNT = 'count';
const MAIN_CONTENT_HEIGHT = 250;
const SECONDARY_CONTENT_HEIGHT = cardContentHeight - MAIN_CONTENT_HEIGHT;
const PROPORTION: number = SECONDARY_CONTENT_HEIGHT / MAIN_CONTENT_HEIGHT;
const ROAD_NUMBER_REGEX: string = 'כביש [0-9]+';
const PRIMARY_FONT_SIZE = 14;

interface IProps {
  data: IWidgetHeadOnCollisionsComparisonData;
  segmetText: string;
  usePercent?: boolean;
  roadNumber: number;
}

const useStyles = makeStyles((theme: Theme) => ({
  roadNumber: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  textHighlight: {
    color: '#8a1212',
  },
}));

const HeadOnCollisionsComparisonWidget: FC<IProps> = ({ data, segmetText, usePercent, roadNumber }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const bigPieData = data.items.specific_road_segment_fatal_accidents;
  const smallPieData = data.items.all_roads_fatal_accidents;
  const roadNumberSegment: string[] | null = segmetText.match(ROAD_NUMBER_REGEX);
  const descSegment: string = roadNumberSegment == null ? '' : segmetText.substr(roadNumberSegment[0].length);
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" height={MAIN_CONTENT_HEIGHT} width={'100%'}>
        <Box flexBasis={120} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <div className={classes.roadNumber}>
            <div className={classes.textHighlight}>
              <Text type={TextType.PAGE_TITLE}> כביש </Text>
            </div>
            <RoadNumberImage roadNumber={roadNumber} />
          </div>
          <Box display="flex" flexDirection="column">
            <span className={classes.textHighlight}>{roadNumberSegment == null ? null : roadNumberSegment[0]}</span>
            <span>{descSegment}</span>
          </Box>
        </Box>
        <PieChartView innerRadius={'60%'} data={bigPieData} xLabel={ACCIDENT_TYPE} yLabel={COUNT} usePercent={usePercent}
                      customizedLabel={renderCollisionCustomizedLabel}/>
      </Box>
      <Box
        display="flex"
        height={SECONDARY_CONTENT_HEIGHT}
        width={'100%'}
        fontSize={(PROPORTION * PRIMARY_FONT_SIZE).toString() + 'px'}
      >
        <PieChartView innerRadius={'60%'} data={smallPieData} xLabel={ACCIDENT_TYPE} yLabel={COUNT} usePercent={usePercent}
                      customizedLabel={renderCollisionCustomizedLabel}/>
        <Box justifyContent={'center'} flexBasis={280} display="flex" flexDirection="column" alignItems="start">
          <div className={classes.textHighlight}>
            <Text type={TextType.CONTENT}>{t('onUrban.road')}</Text>
          </div>
          <Text type={TextType.CONTENT}>{t('onUrban.location')}</Text>
        </Box>
      </Box>
      <Text type={TextType.CONTENT}>{'* בין השנים 2015-2019'}</Text>
    </Box>
  );
};
export default HeadOnCollisionsComparisonWidget;
