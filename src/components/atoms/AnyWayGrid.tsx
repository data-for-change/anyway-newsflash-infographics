import React, { FunctionComponent } from 'react'
import Grid from '@material-ui/core/Grid'
interface IProps {}
const AnyWayGrid: FunctionComponent<IProps> = ({ children }) => {
    const devStyles = {
        maxWidth: '100%',
        margin: 12,
        justifyContent: 'center',
        padding: 20
    };
    return (
        <Grid style={devStyles} container>
            {children}
        </Grid>
    )
};
export default AnyWayGrid
