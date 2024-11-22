import React, { FC } from 'react';
import { IWidgetAccidentSeverityByCrossLocationData } from 'models/WidgetData';
import {ReactComponent as CrossRoad} from "assets/cross-road.svg";
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
interface IProps {
  data: IWidgetAccidentSeverityByCrossLocationData;
}

interface SeverityCountType{    
  killed_injury_severity_count: number;
  severe_injury_severity_count: number;
  light_injury_severity_count: number;}

enum CrossLocationType{
  CrossRoad,
  NotCrossRoad,
}

const sumAllSeverity = (data: SeverityCountType) : number=>{
  return data.killed_injury_severity_count  +
  data.severe_injury_severity_count +
  data.light_injury_severity_count
}
 
const useStyles = makeStyles({
  crossWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%'
  },
  displayRow: {
    display: 'flex',
    flexDirection: 'row',
    flex: '1'
  },
  crossCount:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'end',
    alignItems: 'center',
    flex: '1'
  },
  crossRoadCountBase:{
    color:'white',
    textAlign: 'center',
    borderRadius: '5px',
    fontSize: '30px',
    width: 'fit-content',
  },
  crossRoadCount:{
    backgroundColor:'#fa9136',
    padding: '25px',
    boxShadow: '5px 5px #c06025',
  },
  notCrossRoadCount:{
    backgroundColor:'#f81532',
    padding: '35px',
    boxShadow: '5px 5px #8d1c29',
  },
  crossRoadText:{
    color:'orange',
    margin: '15px 0px'

  },
  notCrossRoadText:{
    color:'red',
    margin: '15px 0px'
  },
  image:{
    height: '100%',
    width: '100%'
  }
});

const AccidentSeverityByCrossLocation: FC<IProps> = ({data}) => {
  const classes = useStyles();
  const countByCross= data.items.map(item =>({ text: item.cross_location_text , count: sumAllSeverity(item)})) 
  return <div className={classes.crossWrapper}> 
    <div  className={classes.displayRow}>
      <div className={classes.crossCount}>
        <div className={classNames(classes.crossRoadCountBase,classes.crossRoadCount)}>{countByCross[0].count}</div> 
        <div className={classes.crossRoadText}>{countByCross[0].text}</div>
      </div>
      <div className={classes.crossCount}>
        <div className={classNames(classes.crossRoadCountBase,classes.notCrossRoadCount)}>{countByCross[1].count}</div> 
        <div className={classes.notCrossRoadText}>{countByCross[1].text}</div>
      </div>
    </div>
    <div  className={classes.displayRow}><CrossRoad className={classes.image}/></div>
  </div>;
};
export default AccidentSeverityByCrossLocation;
