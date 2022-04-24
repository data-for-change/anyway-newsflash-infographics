import React, { FC } from 'react';
import { Typography } from 'components/atoms';
import PieChartView, { renderCollisionCustomizedLabel } from '../PieChartView';
import { IWidgetHeadOnCollisionsComparisonData } from 'models/WidgetData';
import { Box, makeStyles } from '@material-ui/core';
import { cherryJamColor, silverSpoonColor } from 'style';
import { useTranslation } from 'react-i18next';
import RootStore from 'store/root.store';
import { useStore } from 'store/storeConfig';

const ACCIDENT_TYPE = 'desc';
const COUNT = 'count';
const MAIN_CONTENT_HEIGHT = 250;
const SECONDARY_CONTENT_HEIGHT = 190;

interface IProps {
  data: IWidgetHeadOnCollisionsComparisonData;
  segmetText: string;
  usePercent?: boolean;
}

const useStyles = makeStyles(() => ({
  textHighlight: {
    color: cherryJamColor,
  },
  segmentDesc: {
    color: silverSpoonColor,
  },
  timeRange: {
    position: 'relative',
    bottom: '25%',
    right: '10%',
    color: silverSpoonColor,
  },
  primaryContent: {
    display: 'flex',
    height: MAIN_CONTENT_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryDesc: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
  },
  secondaryContent: {
    display: 'flex',
    height: SECONDARY_CONTENT_HEIGHT,
    width: '80%',
    position: 'relative',
    bottom: '10%',
  },
  secondaryDesc: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
  },
}));

const HeadOnCollisionsComparisonWidget: FC<IProps> = ({ data, segmetText, usePercent }) => {
  const classes = useStyles();
  const store: RootStore = useStore();
  const { widgetsStore } = store;
  const { t } = useTranslation();
  const bigPieData = data.items.specific_road_segment_fatal_accidents;
  const smallPieData = data.items.all_roads_fatal_accidents;
  const roadNumberSegment: string = ` ${t('onUrban.route')} ${widgetsStore.newsFlashWidgetsMetaRoadNumber}`;
  const descSegment: string = roadNumberSegment == null ? '' : segmetText.substr(roadNumberSegment.length);
  return (
    <Box height={'100%'} display="flex" flexDirection="column" mr={'80px'}>
      <Box className={classes.primaryContent}>
        <Box className={classes.primaryDesc}>
          <Box className={classes.textHighlight}>
            <Typography.Body2>{roadNumberSegment == null ? null : roadNumberSegment}</Typography.Body2>
          </Box>
          <Box className={classes.segmentDesc}>
            <Typography.Body3>{descSegment}</Typography.Body3>
          </Box>
        </Box>
        <PieChartView
          width={'80%'}
          outerRadius={'115%'}
          labelProps={{ customizedLabel: renderCollisionCustomizedLabel, labelFontSize: '120%' }}
          data={bigPieData}
          xLabel={ACCIDENT_TYPE}
          yLabel={COUNT}
          usePercent={usePercent}
        />
      </Box>
      <Box className={classes.secondaryContent}>
        <Box className={classes.secondaryDesc}>
          <div className={classes.textHighlight}>
            <Typography.Body3>{t('onUrban.road')}</Typography.Body3>
          </div>
          <div className={classes.segmentDesc}>
            <Typography.Body5>{t('onUrban.location')} </Typography.Body5>
          </div>
        </Box>

        <PieChartView
          width={'70%'}
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
