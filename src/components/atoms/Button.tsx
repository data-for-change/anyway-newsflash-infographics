import React, {FunctionComponent} from 'react';

interface IProps {
  onClick: () => any,
}

export const Button: FunctionComponent<IProps> = ({onClick, children}) => (
  <button onClick={onClick}>{children}</button>
);
