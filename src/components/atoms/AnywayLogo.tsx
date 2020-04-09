import React, { FunctionComponent, useMemo } from 'react';
import AnywayImage from '../../assets/anyway.png';

interface AnywayLogoProps {
  height: string;
}

export const AnywayLogo: FunctionComponent<AnywayLogoProps> = ({ height }) => {
  const logo = useMemo(() => AnywayImage.toString(), []);

  const logoStyle = useMemo(
    () => ({
      height
    }),
    [height]
  );

  return <img src={logo} alt='logo' style={logoStyle} />;
};
