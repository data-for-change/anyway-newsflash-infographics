import React, { FC, useMemo } from 'react';
import LocationMap from 'components/molecules/LocationMap';
import { IWidgetMostSevereAccidentsData } from 'models/WidgetData';
import { Box } from '@material-ui/core';
import carOrangeIcon from 'assets/map/car-orange-marker.png';
import carRedIcon from 'assets/map/car-red-marker.png';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { aggregatePoints } from 'utils/map.utils';
import { IAggregatePointAccident } from 'models/Point';
import { ClockPosition } from 'models/ClockPosition';


function linearRegression(points: { longitude: number; latitude: number }[]) {
  const n = points.length;
  if (n < 2) return null;
  const sumX = points.reduce((sum, p) => sum + p.longitude, 0);
  const sumY = points.reduce((sum, p) => sum + p.latitude, 0);
  const sumXY = points.reduce((sum, p) => sum + p.longitude * p.latitude, 0);
  const sumXX = points.reduce((sum, p) => sum + p.longitude * p.longitude, 0);
  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) {
    // All points have the same longitude (vertical line)
    return null;
  }
  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}


function getLabelClockPosition(
  slope: number | null,
  mod: number
): ClockPosition {
  let degrees: number;
  if (slope === null || !isFinite(slope)) {
    degrees = mod === 0 ? 0 : 180;
  } else {
    const baseAngle = Math.atan(slope);
    const perpAngle = baseAngle + (mod === 0 ? Math.PI / 2 : -Math.PI / 2);
    degrees = ((perpAngle * 180) / Math.PI + 360) % 360; // convert to [0, 360)
  }
  const snappedAngle = Math.round(degrees / 45) * 45 % 360;
  const angleToClockPosition: { [angle: number]: ClockPosition } = {
    0: ClockPosition.RIGHT,
    45: ClockPosition.TOPRIGHT,
    90: ClockPosition.TOP,
    135: ClockPosition.TOPLEFT,
    180: ClockPosition.LEFT,
    225: ClockPosition.BOTTOMLEFT,
    270: ClockPosition.BOTTOM,
    315: ClockPosition.BOTTOMRIGHT,
  };
  return angleToClockPosition[snappedAngle];
}

interface IProps {
  data: IWidgetMostSevereAccidentsData;
  sizeOptions: number;
}


const useStyles = makeStyles({
  carLogo: {
    height: '20px',
    width: '20px',
  },
  iconsContainer: {
    display: 'flex',
    paddingTop: '8px',
    marginInlineStart: '5px',
  },
  singleIcon: {
    display: 'flex',
    paddingTop: '4px',
    marginInlineEnd: '20px',
    fontWeight: 400,
    fontSize: '13px',
    alignItems: 'center',
  },
  logoTextSpace: {
    marginInlineStart: '5px',
  },
  mapBox: {
    height: '85%',
    paddingTop: '2rem',
  },
});


function getSortedItemsAlongLine(
  items: IAggregatePointAccident[],
  slope: number | null
): IAggregatePointAccident[] {
  if (slope === null || !isFinite(slope)) {
    return [...items].sort((a, b) => a.latitude - b.latitude);
  }
  const dx = 1;
  const dy = slope;

  return [...items].sort((a, b) => {
    const projA = a.longitude * dx + a.latitude * dy;
    const projB = b.longitude * dx + b.latitude * dy;
    return projA - projB;
  });
}


const MostSevereAccidentsMapWidget: FC<IProps> = ({ data }) => {
  const classes = useStyles();
  const { items } = data;
  const { t } = useTranslation();
  const aggregatedItems: IAggregatePointAccident[] = useMemo(
    () => aggregatePoints(items),
    [items]
  );
 const itemsWithLabelPosition = useMemo(() => {
  const regression = linearRegression(aggregatedItems);
  const slope = regression ? regression.slope : null;
  const sortedItems = getSortedItemsAlongLine(aggregatedItems, slope);
  return sortedItems.map((item, idx) => ({
    ...item,
    labelClockPosition: getLabelClockPosition(slope, idx % 2),
  }));
}, [aggregatedItems]);

  return (
    <Box height={'100%'}>
      <Box className={classes.mapBox}>
        {itemsWithLabelPosition.length > 0 && (
          <LocationMap key={itemsWithLabelPosition.map(i => i.accident_timestamp).join(',')} items={itemsWithLabelPosition} />
        )}
      </Box>
      <Box className={classes.iconsContainer}>
        <Box className={classes.singleIcon}>
          <img className={classes.carLogo} src={carRedIcon} alt="fatal car accident" />
          <Box className={classes.logoTextSpace}>{t('textView.fatal.singular')}</Box>
        </Box>
        <Box className={classes.singleIcon}>
          <img className={classes.carLogo} src={carOrangeIcon} alt="severe car accident" />
          <Box className={classes.logoTextSpace}>{t('textView.severe.singular')} </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default MostSevereAccidentsMapWidget;
