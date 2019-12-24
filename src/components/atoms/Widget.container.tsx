import React, { FunctionComponent } from 'react';
import { Card } from '@material-ui/core';

interface IProps {

}
export const WidgetContainer: FunctionComponent<IProps> = ({ children }) => {
    const devStyles = {
        padding: 20,
        margin: 10,
        borderRadius: 15
    }
    return (
        <React.Fragment>
            <Card style={devStyles} >
                {children}
            </Card>
        </React.Fragment>
    )

}