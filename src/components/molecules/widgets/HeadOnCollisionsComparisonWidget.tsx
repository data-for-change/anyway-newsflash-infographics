import React, { FC } from 'react';
import { Text, TextType } from '../../atoms';
import PieChartView, {renderCollisionCustomizedLabel} from '../PieChartView';
import { IWidgetHeadOnCollisionsComparisonData } from '../../../models/WidgetData';
import { Box, makeStyles, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const ACCIDENT_TYPE = 'desc';
const COUNT = 'count';
const MAIN_CONTENT_HEIGHT = 250;
const SECONDARY_CONTENT_HEIGHT = 190;
const PROPORTION: number = SECONDARY_CONTENT_HEIGHT / MAIN_CONTENT_HEIGHT;
const ROAD_NUMBER_REGEX: string = 'כביש [0-9]+';
const PRIMARY_FONT_SIZE = 14;

interface IProps {
  data: IWidgetHeadOnCollisionsComparisonData;
  segmetText: string;
  usePercent?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  textHighlight: {
    color: '#8a1212',
    textAlign:'end'

  },
  segmentDesc:{
    color:'gray',
    textAlign:'end'
  },
  secondaryContent:{
    display: 'flex',
    height :SECONDARY_CONTENT_HEIGHT,
    width :'80%',
    position: 'relative',
    bottom: '30%',
    left:'3%'

  },
}));

const HeadOnCollisionsComparisonWidget: FC<IProps> = ({ data, segmetText, usePercent }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const bigPieData = data.items.specific_road_segment_fatal_accidents;
  const smallPieData = data.items.all_roads_fatal_accidents;
  const roadNumberSegment: string[] | null = segmetText.match(ROAD_NUMBER_REGEX);
  const descSegment: string = roadNumberSegment == null ? '' : segmetText.substr(roadNumberSegment[0].length);
  return (
    <Box height={'100%'} display="flex" flexDirection="column">
      <Box display="flex" height={MAIN_CONTENT_HEIGHT} width={'100%'}>
          <Box  display="flex" flexDirection="column">
            <span className={classes.textHighlight}>{roadNumberSegment == null ? null : roadNumberSegment[0]}</span>
            <span className={classes.segmentDesc} >{descSegment}</span>
          </Box>
        <PieChartView customizedLabel={renderCollisionCustomizedLabel} data={bigPieData} xLabel={ACCIDENT_TYPE} yLabel={COUNT} usePercent={usePercent}
        />
      </Box>
      <Box
       className={classes.secondaryContent}
        fontSize={(PROPORTION * PRIMARY_FONT_SIZE).toString() + 'px'}
      >
        <Box justifyContent={'center'}  display="flex" flexDirection="column">
          <div  className={classes.textHighlight}>
            <Text type={TextType.CONTENT}>{t('onUrban.road')}</Text>
          </div>
          <div className={classes.segmentDesc}>
          <Text  type={TextType.CONTENT}>{t('onUrban.location')}</Text>
          </div>
        </Box>

          <PieChartView customizedLabel={renderCollisionCustomizedLabel} data={smallPieData} xLabel={ACCIDENT_TYPE} yLabel={COUNT} usePercent={usePercent}
          />
      </Box>
      <Text type={TextType.CONTENT}>{'* בין השנים 2015-2019'}</Text>
    </Box>
  );
};
export default HeadOnCollisionsComparisonWidget;
