import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {HomePage} from './pages/HomePage';
import {SideBar} from './components/templates/SideBar';
import {AppBar} from './components/templates/AppBar';
import {Footer} from './components/templates/Footer';
import {Box, CssBaseline} from '@material-ui/core';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline/>
      <Box display="flex" flexDirection="column" height="100%">
        <AppBar/>
        <Box display="flex" flexGrow={1}>
          <Box flexGrow={1}>
            <SideBar/>
          </Box>
            <Switch>
              <Route path="/" component={HomePage}/>
            </Switch>
        </Box>
        <Footer/>
      </Box>
    </Router>
  );
};

export default App;
