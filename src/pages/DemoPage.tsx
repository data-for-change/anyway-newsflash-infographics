import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Box, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RepresentationInCivilService from '../assets/demo/representation-in-civil-service.jpg';

interface IProps {}

const useStyles = makeStyles({
  content: {
    '& img': {
      width: '100%',
    },
  },
});

const DemoPage: FC<IProps> = () => {
  const classes = useStyles();
  return (
    // <Card className={classes.root} variant="outlined">
    <Card variant="outlined">
      <Box position="relative" padding={3} height={500} width={500}>
        <Box width="100%">
          <CardContent className={classes.content}>
            <img src={RepresentationInCivilService} alt="representation-in-civil-service" />
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};

export default observer(DemoPage);
