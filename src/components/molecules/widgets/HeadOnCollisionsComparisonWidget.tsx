import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Typography } from 'components/atoms';
import { IWidgetHeadOnCollisionsComparisonData } from 'models/WidgetData';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import RootStore from 'store/root.store';
import { useStore } from 'store/storeConfig';
import { cherryJamColor, silverSpoonColor } from 'style';
import PieChartView, { renderCollisionCustomizedLabel } from '../PieChartView';

const PREFIX = 'HeadOnCollisionsComparisonWidget';

const classes = {
  textHighlight: `${PREFIX}-textHighlight`,
  segmentDesc: `${PREFIX}-segmentDesc`,
  timeRange: `${PREFIX}-timeRange`,
  primaryContent: `${PREFIX}-primaryContent`,
  primaryDesc: `${PREFIX}-primaryDesc`,
  secondaryContent: `${PREFIX}-secondaryContent`,
  secondaryDesc: `${PREFIX}-secondaryDesc`,
};

const StyledBox = styled(Box)(() => ({
  [`& .${classes.textHighlight}`]: {
    color: cherryJamColor,
  },

  [`& .${classes.segmentDesc}`]: {
    color: silverSpoonColor,
  },

  [`& .${classes.timeRange}`]: {
    position: 'relative',
    bottom: '25%',
    right: '10%',
    color: silverSpoonColor,
  },

  [`& .${classes.primaryContent}`]: {
    display: 'flex',
    height: MAIN_CONTENT_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  [`& .${classes.primaryDesc}`]: {
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
  },

  [`& .${classes.secondaryContent}`]: {
    display: 'flex',
    height: SECONDARY_CONTENT_HEIGHT,
    width: '80%',
    position: 'relative',
    bottom: '10%',
  },

  [`& .${classes.secondaryDesc}`]: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '30%',
  },
}));

const ACCIDENT_TYPE = 'desc';
const COUNT = 'count';
const MAIN_CONTENT_HEIGHT = 250;
const SECONDARY_CONTENT_HEIGHT = 190;

interface IProps {
  data: IWidgetHeadOnCollisionsComparisonData;
  segmetText: string;
  usePercent?: boolean;
}

const HeadOnCollisionsComparisonWidget: FC<IProps> = ({ data, segmetText, usePercent }) => {
  const store: RootStore = useStore();
  const { t } = useTranslation();
  const bigPieData = data.items.specific_road_segment_fatal_accidents;
  const smallPieData = data.items.all_roads_fatal_accidents;
  const roadNumberSegment: string = ` ${t('onUrban.route')} ${store.newsFlashWidgetsMetaRoadNumber}`;
  const descSegment: string = roadNumberSegment == null ? '' : segmetText.substr(roadNumberSegment.length);
  return (
    <StyledBox height={'100%'} display="flex" flexDirection="column" mr={'80px'}>
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
    </StyledBox>
  );
};
export default HeadOnCollisionsComparisonWidget;
