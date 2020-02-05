import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import {SideBar} from './components/templates/SideBar'
import {Footer} from './components/templates/Footer'
import {Box, CssBaseline} from '@material-ui/core'
import {store, StoreContext} from './store/storeConfig'
import {Header} from './components/molecules/Header';

const App: React.FC = () => {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <CssBaseline/>
        <Header/>
        <Box display='flex' flexDirection='column' height='100%'>
          <Box display='flex' flexGrow={1}>
            <Box flexGrow={1}>
              <SideBar/>
            </Box>
            <Switch>
              <Route path='/' component={HomePage}/>
            </Switch>
          </Box>
          <Footer/>
        </Box>
      </Router>
    </StoreContext.Provider>
  )
}
export default App
