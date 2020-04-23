import React, { FC } from 'react';
import { IWidgetCountBySeverity } from '../../models/WidgetData';
import { Text, TextType } from '../atoms';
import { Theme, makeStyles, Avatar } from '@material-ui/core'
import roadNumberIcon from '../../assets/640px-ISR-HW-90.svg.png';

interface IProps {
  data: IWidgetCountBySeverity[];
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-evenly',
    background: 'linear-gradient(180deg, rgba(61,4,4,1) 0%, rgba(36,0,0,0.8548012955182073) 50%, rgba(61,4,4,1) 100%)',
    padding: '5px',
    borderRadius: '10px',
    color: 'red',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(5),
  },
}));
const TextView: FC<IProps> = (props) => {
  //hardcoded, waiting for data changes from the server
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar variant='square' alt='Road Number' src={roadNumberIcon} className={classes.large} />
      <Text type={TextType.WIDGET_TITLE}>
        `בין השנים {'2015-2019'} במקטע מצפה שלם - צומת שדי שבכביש {'90'} התרחשו{'266 '}תאונות`
      </Text>
      <Text type={TextType.WIDGET_CONTENT}>
        {'קטלניות'}
        {' 13'}
      </Text>
      <Text type={TextType.WIDGET_CONTENT}>
        {'קשות'}
        {' 16'}
      </Text>
      <Text type={TextType.WIDGET_CONTENT}>
        {'קלות'}
        {' 225'}
      </Text>
    </div>
  );
};
export default TextView;
