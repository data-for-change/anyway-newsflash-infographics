import React, { FunctionComponent } from 'react';
import { Card } from '@material-ui/core';

interface IProps {

}
export const AnyWayCard: FunctionComponent<IProps> = ({ children }) => {
    const devStyles = {
        padding: 20,
        margin: 10,
        borderRadius: 15,
        flex: 1
    }
    return (
        <Card style={devStyles} >
            {children}
        </Card>
    )
}