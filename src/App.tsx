import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import {HomePage} from './pages/HomePage';

const App: React.FC = () => {
  const styles = {
    logo: {
      height: '15vh'
    }
  };

  return (
    <Router>
      <div>
        <header>
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
        <Switch>
          <Route path="/" component={HomePage}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
