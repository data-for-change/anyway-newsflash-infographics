import React from 'react';
import logoHasdna from '../../assets/hasadna.png';
import { makeStyles } from '@material-ui/core/styles';
import { AnywayLink } from '../atoms/';
import { Box } from '@material-ui/core';
import { borderColor } from '../../style/_globals';

interface IProps {}
const useStyles = makeStyles({
  logo: {
    height: '30px',
  },
  footer: {
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    paddingRight: '150px',
    border: `1px solid ${borderColor}`,
  },
});

export const Footer: React.FC<IProps> = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <a href="https://www.hasadna.org.il/" target="_blank" rel="noopener noreferrer">
        <img src={logoHasdna} alt="logo-hasadna" className={classes.logo} />
      </a>
      <AnywayLink to="/about">
        <Box p={2} component="span">
          אודות
        </Box>
      </AnywayLink>
      <AnywayLink to="/thank-you">
        <Box p={2} component="span">
          תודות
        </Box>
      </AnywayLink>
    </footer>
  );
};
