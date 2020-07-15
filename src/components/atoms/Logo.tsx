import React, { FC } from 'react';

interface LogoProps {
  src: string;
  alt: string;
  height: string;
  onClick?: () => any;
}
export const Logo: FC<LogoProps> = ({ src, alt, height, onClick }) => (
  <img src={src} alt={alt} height={`${height}`} onClick={onClick} />
);
