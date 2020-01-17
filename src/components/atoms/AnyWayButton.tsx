import React, {FunctionComponent} from 'react';
import {Button, ButtonProps} from "@material-ui/core";


interface IProps {
    onClick: () => any,
    buttonProps: ButtonProps
}

export const AnyWayButton: FunctionComponent<IProps> = ({onClick, children, buttonProps}) => (
    <Button {...buttonProps} onClick={onClick}>{children}</Button>
);
