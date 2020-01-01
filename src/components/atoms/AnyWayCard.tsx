import React, { FunctionComponent } from 'react';
import Card  from '@material-ui/core/Card';

interface IProps {

}
const AnyWayCard: FunctionComponent<IProps> = ({ children }) => {
    const devStyles = {
        padding: 20,
        margin: 10,
        borderRadius: 15,
        width: 400,
        height: 450
    }
    return (
        <Card style={devStyles} >
            {children}
        </Card>
    )
}
export default AnyWayCard