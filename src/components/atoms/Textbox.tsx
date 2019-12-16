import React, {FunctionComponent} from 'react';

interface IProps {
  value: string,
  onChange: (value: string) => any,
}

export const Textbox: FunctionComponent<IProps> = ({value = '', onChange}) => {

  const changFn = (e: any) => {
    onChange(e);
  };

  return (
    <input value={value} onChange={changFn}/>
  );
};
