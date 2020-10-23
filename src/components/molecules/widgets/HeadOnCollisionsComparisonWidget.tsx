import React, { FC } from 'react';
import { Typography } from '../../atoms';
import PieChartView, { renderCollisionCustomizedLabel } from '../PieChartView';
import { IWidgetHeadOnCollisionsComparisonData } from '../../../models/WidgetData';
import { Box, makeStyles } from '@material-ui/core';
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

const useStyles = makeStyles(() => ({
  textHighlight: {
    color: '#8a1212',
  },
  segmentDesc: {
    color: '#647171',
  },
  timeRange: {
    position: 'relative',
    bottom: '25%',
    right: '10%',
    color: '#647171',
  },
  primaryContent: {
    display: 'flex',
    height: MAIN_CONTENT_HEIGHT,
    width: '100%',
  },
  primaryDesc: {
    display: 'flex',
    flexDirection: 'column',
    paddingRight: '10%',
    paddingTop: '7%',
  },
  secondaryContent: {
    display: 'flex',
    height: SECONDARY_CONTENT_HEIGHT,
    width: '80%',
    position: 'relative',
    bottom: '25%',
    left: '5%',
    fontSize: `${(PROPORTION * PRIMARY_FONT_SIZE).toString()} px`
  },
  secondaryDesc: {
    paddingRight: '20%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
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
      <Box className={classes.primaryContent}>
        <Box className={classes.primaryDesc}>
          <Box className={classes.textHighlight}>
            <Typography.Body5>{roadNumberSegment == null ? null : roadNumberSegment[0]}</Typography.Body5>
          </Box>
          <Box className={classes.segmentDesc}>
            <Typography.Body5>{descSegment}</Typography.Body5>
          </Box>
        </Box>
        <PieChartView
          width={'60%'}
          outerRadius={'115%'}
          labelProps={{ customizedLabel: renderCollisionCustomizedLabel, labelFontSize: '120%' }}
          data={bigPieData}
          xLabel={ACCIDENT_TYPE}
          yLabel={COUNT}
          usePercent={usePercent}
        />
      </Box>
      <Box className={classes.secondaryContent} >
        <Box className={classes.secondaryDesc}>
          <div className={classes.textHighlight}>
            <Typography.Body5>{t('onUrban.road')}</Typography.Body5>
          </div>
          <div className={classes.segmentDesc}>
            <Typography.Body5>{t('onUrban.location')} </Typography.Body5>
          </div>
        </Box>

        <PieChartView
          width={'90%'}
          labelProps={{ customizedLabel: renderCollisionCustomizedLabel, labelFontSize: '100%' }}
          data={smallPieData}
          xLabel={ACCIDENT_TYPE}
          yLabel={COUNT}
          usePercent={usePercent}
          outerRadius={'100%'}
        />
      </Box>
    </Box>
  );
};
export default HeadOnCollisionsComparisonWidget;
