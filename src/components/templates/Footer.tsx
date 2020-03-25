import React, { FunctionComponent } from 'react';
import logoHasdna from '../../assets/hasadna.png';
import { makeStyles } from '@material-ui/core/styles';
import {AnywayLink} from '../atoms/';
import {Box} from "@material-ui/core";

interface IProps {
}
const useStyles = makeStyles({
  logo: {
    height: '30px'
  },
  footer : {
    bottom: '0',
    width: '100%',
    display: 'flex',
    paddingRight: '150px',
  },
});

export const Footer: FunctionComponent<IProps> = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <a href="https://www.hasadna.org.il/" target="_blank" rel="noopener noreferrer">
       <img src={logoHasdna} alt="logo-hasadna" className={classes.logo}/>
      </a>
        <AnywayLink to="/about">
          <Box pt={2} pr={1}>
            אודות
          </Box>
        </AnywayLink>
        <AnywayLink to="/thank-you">
          <Box pt={2} pr={1}>
            תודות
          </Box>
          </AnywayLink>
    </footer>
  );
};
