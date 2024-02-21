import React from 'react';
import Box from '@material-ui/core/Box';
import { roadIconColors, silverSmokeColor } from 'style';
import SeverityImage from './SeverityImage';
import { makeStyles } from '@material-ui/core/styles';
import { Typography , CustomTypography} from 'components/atoms';
import classNames from 'classnames';

interface IProps {
  numOfAccidents: number;
  severityDesc: string;
  imgSrc: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '90%',
    height: '20%',
    borderBottom: '5px solid',
    borderBlockColor: silverSmokeColor,
    '&:last-child': {
      borderBottom: '0px',
    },
  },
  padding : {
    padding : '0 10px'
  },
  text: {
    display:'flex',
    alignItems: 'end',
    textAlign: 'center',
  },
  acNum: {
    position: 'relative',
    display: 'flex',
    paddingLeft : theme.spacing(1),
    paddingRight : theme.spacing(1),
    alignItems: 'end',
    textAlign: 'end',
    justifyContent: 'center',
    color: roadIconColors.red,
  },

  numOfAccLarge : {
    fontSize : 56,
    fontWeight: "bold",
    lineHeight:1
  }
}));

const TextViewRecordLargeNumbers: React.FC<IProps> = ({ numOfAccidents, severityDesc, imgSrc }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <SeverityImage  inRecord severity={imgSrc} />
      <Box className={classNames(classes.acNum)}>
        <CustomTypography.Span className={classes.numOfAccLarge}>{numOfAccidents}</CustomTypography.Span>
      </Box>
      <Box className={classNames(classes.text,classes.padding)}>
        <Typography.Title1>{severityDesc}</Typography.Title1>
      </Box>
    </Box>
  );
};

export default TextViewRecordLargeNumbers;
