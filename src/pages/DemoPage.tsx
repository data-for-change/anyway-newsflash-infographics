import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CivilServiceRate from 'assets/demo/civil-service-rate.jpg';
import RepresentationInCivilService from 'assets/demo/representation-in-civil-service.jpg';
import RepresentationInGoverment from 'assets/demo/representation-in-government-companies.jpg';
import { Grid } from 'components/atoms';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { cardHeight, cardWidth } from '../style';

const PREFIX = 'DemoPage';

const classes = {
  demoImage: `${PREFIX}-demoImage`,
  demoContainer: `${PREFIX}-demoContainer`,
};

const StyledGridContainer = styled(Grid.Container)({
  [`& .${classes.demoImage}`]: {
    width: '100%',
    height: '100%',
  },
  [`& .${classes.demoContainer}`]: {
    height: cardHeight,
    width: cardWidth,
    position: 'relative',
  },
});

interface IProps {}

const demoCardsImg: Array<string> = [RepresentationInCivilService, RepresentationInGoverment, CivilServiceRate];

const DemoPage: FC<IProps> = () => {
  const demoCards = demoCardsImg.map((cardImg: string, index: number) => {
    return (
      <Box key={index} className={classes.demoContainer} padding={3}>
        <img src={cardImg} className={classes.demoImage} alt={cardImg.toString()} />
      </Box>
    );
  });
  return <StyledGridContainer>{demoCards}</StyledGridContainer>;
};

export default observer(DemoPage);
