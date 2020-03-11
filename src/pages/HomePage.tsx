import React, {FunctionComponent} from 'react'
import WidgetsTemplate from '../components/templates/WidgetsTemplate'
import {Box} from '@material-ui/core'
import {SideBar} from '../components/templates/SideBar'
import makeStyles from "@material-ui/core/styles/makeStyles";

interface IProps {
}

const useStyles = makeStyles({
    mainBox: {
        height: 'inherit'
    },
    sideBarBox: {
        height: 'inherit',
        overflow: 'auto'

    },
    widgetBox: {
        height: 'inherit',
        overflow: 'auto'
    }
});
const HomePage: FunctionComponent<IProps> = () => {
    const classes = useStyles();

    return (
        <Box display='flex' flexGrow={1} className={classes.mainBox}>
            <Box flexBasis={300} flexShrink={0} className={classes.sideBarBox}>
                <SideBar/>
            </Box>
            <Box flexGrow={1} className={classes.widgetBox}>
                <WidgetsTemplate/>
            </Box>
        </Box>
    )
};

export default HomePage
