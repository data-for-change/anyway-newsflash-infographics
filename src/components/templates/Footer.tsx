import React, { FunctionComponent } from 'react';
import logoHasdna from '../../assets/hasadna.png';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

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
    padding: '15px',      
  },
  footerLink:{
    padding :'5px 10px',
    color: '#08c',
    textDecoration:"none",
    "&:hover": {
      textDecoration:"underline",
    },
  },
});

export const Footer: FunctionComponent<IProps> = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <a href="https://www.hasadna.org.il/" target="_blank" rel="noopener noreferrer">
       <img src={logoHasdna} alt="logo-hasadna" className={classes.logo}/>
      </a>
      <Link className={classes.footerLink} to="/todo">אודות</Link>
      <Link className={classes.footerLink}  to="/todo">תודות</Link>
    </footer>
  );
};
