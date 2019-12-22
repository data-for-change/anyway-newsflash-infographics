import React, {FunctionComponent} from 'react';
import logo from '../../logo.svg';
import {Link} from 'react-router-dom';

interface IProps {
}

export const AppBar: FunctionComponent<IProps> = () => {
  const styles = {
    logo: {
      height: '15vh'
    }
  };
  
  return (
    <div>
      <header>
        <h1>AppBar</h1>
        <img src={logo} alt="logo" style={styles.logo}/>
        <ul>
          <li>
            <Link to="/todo">To do Page</Link>
          </li>
          <li>
            <Link to="/users">Users Page</Link>
          </li>
          <li>
            <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
          </li>
        </ul>
        <hr/>
      </header>
    </div>
  );
};
