import React, { FC } from 'react';
import { WidgetCountBySeverityTextData } from '../../models/WidgetData';
import { Text, TextType } from '../atoms';
import { Theme, makeStyles } from '@material-ui/core';
import roadNumberIcon from '../../assets/road90.svg.png';
import { highlightBasicColor, highlightDarkColor, highlightAlertColor, highlightWarnColor } from '../../style';

interface IProps {
  data: WidgetCountBySeverityTextData;
  segmentText: string;
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-evenly',
    letterSpacing: 1,
    '& span': {
      marginLeft: 10,
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(5),
  },
  mainText: {
    fontSize: 19,
    lineHeight: '32px',
    padding: '5px',
    backgroundColor: highlightBasicColor,
  },
  bottomText: {
    fontSize: 22,
    padding: '5px 0 5px 5px',
    backgroundColor: highlightBasicColor,
  },
  highlightDark: {
    padding: '5px',
    color: highlightBasicColor,
    backgroundColor: highlightDarkColor,
  },
  highlightAlert: {
    padding: '5px',
    backgroundColor: highlightAlertColor,
  },
  highlightWarn: {
    padding: '5px',
    backgroundColor: highlightWarnColor,
  },
}));
const TextView: FC<IProps> = ( { data, segmentText } ) => {
  const classes = useStyles();
  const { items } = data;
  return (
    <div className={classes.root}>
      <img alt="Road Number" src={roadNumberIcon} className={classes.large} />
      <Text type={TextType.WIDGET_TITLE}>
        <span className={classes.mainText}>
		{items.end_year === items.start_year
		? <><span> בשנה</span>
			<span>{items.end_year}</span> </>
		: <><span>בין השנים</span>
			<span>{items.end_year} - {items.start_year} </span> </>}
		<br />
          <span>במקטע</span>
          <span>{ segmentText }</span>
          <span>התרחשו</span>
          <span className={classes.highlightDark}>{items.total_accidents_count}</span>
          <span>תאונות</span>
        </span>
      </Text>
      <div>
        <Text type={TextType.WIDGET_CONTENT}>
          <span className={classes.bottomText}>
            <span className={classes.highlightAlert}>{items.severity_fatal_count}</span>
            <span>קטלניות</span>
          </span>
        </Text>
        <Text type={TextType.WIDGET_CONTENT}>
          <span className={classes.bottomText}>
            <span className={classes.highlightWarn}>{items.severity_severe_count}</span>
            <span>קשות</span>
          </span>
        </Text>
        <Text type={TextType.WIDGET_CONTENT}>
          <span className={classes.bottomText}>ו- {items.severity_light_count} קלות</span>
        </Text>
      </div>
    </div>
  );
};
export default TextView;
