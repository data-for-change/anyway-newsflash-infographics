import React, { FunctionComponent } from 'react';
import logoHasdna from '../../assets/hasadna.png';
import {Link} from 'react-router-dom';

interface IProps {
}

export const Footer: FunctionComponent<IProps> = () => {
  // remove when no longer required

  const styles = {
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
    },
  };

  return (
    <footer style={styles.footer}>
      <a href="https://www.hasadna.org.il/" target="_blank" rel="noopener noreferrer">
       <img src={logoHasdna} alt="logo-hasadna" style={styles.logo}/>
      </a>
      <Link style={styles.footerLink} to="/todo">אודות</Link>
      <Link style={styles.footerLink}  to="/todo">תודות</Link>
    </footer>
  );
};
