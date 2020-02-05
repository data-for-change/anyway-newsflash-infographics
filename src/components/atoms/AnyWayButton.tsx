import React, {FunctionComponent} from 'react';
import {Button} from "@material-ui/core";

interface IProps {
  onClick: () => any,
}

export const AnyWayButton: FunctionComponent<IProps> = ({onClick, children}) => (
  <Button onClick={onClick}>{children}</Button>
);
