import React, { FC, useMemo } from 'react';
import LamasImage from '../../assets/cbs.png';

interface LamasLogoProps {
  height: string;
}

export const LamasLogo: FC<LamasLogoProps> = ({ height }) => {
  const logo = useMemo(() => LamasImage.toString(), []);

  const logoStyle = useMemo(
    () => ({
      height,
    }),
    [height],
  );

  return <img src={logo} alt="logo" style={logoStyle} />;
};
