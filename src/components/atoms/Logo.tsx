import React, { FC } from 'react';

interface LogoProps {
	src: string;
	alt: string;
  height: string;
}
export const Logo: FC<LogoProps> = ({ src, alt, height }) => (
	<img src={src} alt={alt} height={`${height}`} />
);
