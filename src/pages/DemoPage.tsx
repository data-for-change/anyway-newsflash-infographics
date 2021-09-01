import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RepresentationInCivilService from 'assets/demo/representation-in-civil-service.jpg';
import RepresentationInGoverment from 'assets/demo/representation-in-government-companies.jpg';
import CivilServiceRate from 'assets/demo/civil-service-rate.jpg';
import { Grid } from 'components/atoms';
import { cardHeight, cardWidth } from '../style';

interface IProps {}

const useStyles = makeStyles({
  demoImage: {
    width: '100%',
    height: '100%',
  },
  demoContainer: {
    height: cardHeight,
    width: cardWidth,
    position: 'relative',
  },
});

const demoCardsImg: Array<string> = [RepresentationInCivilService, RepresentationInGoverment, CivilServiceRate];

const DemoPage: FC<IProps> = () => {
  const classes = useStyles();
  const demoCards = demoCardsImg.map((cardImg: string, index: number) => {
    return (
      <Box key={index} className={classes.demoContainer} padding={3}>
        <img src={cardImg} className={classes.demoImage} alt={cardImg.toString()} />
      </Box>
    );
  });
  return <Grid.Container>{demoCards}</Grid.Container>;
};

export default observer(DemoPage);
