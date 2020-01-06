import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {HomePage} from './pages/HomePage';
import {SideBar} from './components/templates/SideBar';
import {AppBar} from './components/templates/AppBar';
import {Box, CssBaseline} from '@material-ui/core';
import {store, StoreContext} from './store/storeConfig';

const App: React.FC = () => {
  return (
    <StoreContext.Provider value={store}>
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
        </Box>
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
