import React, { FunctionComponent } from 'react';
import logoHasdna from '../../assets/hasadna.png';
import { makeStyles } from '@material-ui/core/styles';
import {AnyWayLink} from '../atoms/AnywayLink';
import {onLinkColor} from '../../style/_globals';
import {onLinkColorHover} from '../../style/_globals';
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
  footerLink:{
    padding :'5px 10px',
    color: `${onLinkColor}`,
    textDecoration:"none",
    "&:hover": {
      color:`${onLinkColorHover}`,
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
      <AnyWayLink to="/about">אודות</AnyWayLink>
      <AnyWayLink to="/todo">תודות</AnyWayLink>
    </footer>
  );
};
