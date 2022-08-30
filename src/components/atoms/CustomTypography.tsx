import { FC } from 'react';

interface ICustomTypographyProps{
  className : string;
}

 const CustomTypography : Record< 'Div'|'p'| 'Span', FC<ICustomTypographyProps>>  = {
  Div : ({ className, children}) => <div className={className}> {children}</div>,
  p : ({ className, children}) => <p className={className}> {children}</p>,
  Span : ({ className, children}) => <span className={className}> {children}</span>
}

export default CustomTypography
