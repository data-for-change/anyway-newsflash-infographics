import React, {FC } from 'react';
import Loader from '../atoms/Loader';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import { borderColor } from '../../style/_globals';

const useStyles = makeStyles({
   over: {
    minWidth: '100%',
    minHeight: '100%',
    backgroundColor: borderColor,
    opacity: 0.1,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column'
   },
   loader: {
       alignSelf: 'center',
       marginTop: '10px'
   }
})

interface IProps {
}
const OverlayLoader: FC<IProps> = ({children}) => {
    const classes = useStyles()
    return (
      <Box className={classes.over}>
        <Box className={classes.loader}>
          <Loader />
        </Box>
        {children}
      </Box>
    );
}
export default OverlayLoader;
