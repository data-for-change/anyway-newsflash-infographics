import React, {FC } from 'react';
import Loader from '../atoms/Loader';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import { borderColor } from '../../style/_globals';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';


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
    dataToLoad: string 
}
const OverlayLoader: FC<IProps> = ({ dataToLoad, children}) => {
    const classes = useStyles()
    const store: RootStore = useStore();
    const loadingArray: Array<string> = toJS(store.dataIsLoading)
    const loading = loadingArray.includes(dataToLoad);
    return (
        <Box>
            {loading ?
                <Box className={classes.over} >
                    <Box className={classes.loader}>
                        <Loader />
                    </Box>
                    {children}
                </Box> :
                <>
                {children}
                </>
            }
        </Box>
    );
}
export default observer(OverlayLoader);