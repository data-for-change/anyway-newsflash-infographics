import React, { FunctionComponent } from 'react';

interface IProps {
}

export const Footer: FunctionComponent<IProps> = () => {
  // remove when no longer required
  const copyright = {
    color: 'gray'
  };
  const footer = {
    padding: '15px',
  };

  return (
    <footer style={footer}>
      <div style={copyright}>
        <span > על אתר זה חל רשיון שימוש  CC BY-SA 4.0</span>
      </div>
    </footer>
  );
};
