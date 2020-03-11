import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About';
import ThankYou from './pages/ThankYou';
import { Footer } from './components/templates/Footer'
import { Box, CssBaseline } from '@material-ui/core'
import { store, StoreContext } from './store/storeConfig'
import { Header } from './components/molecules/Header'

const App: React.FC = () => {
	return (
		<StoreContext.Provider value={store}>
			<Router>
				<CssBaseline />
				<Header />
				<Box display='flex' flexDirection='column' height='100%'>
						<Switch>
							<Route exact path='/' component={HomePage} />
							<Route path='/about' component={About} />
							<Route path='/thank-you' component={ThankYou} />
						</Switch>
					<Footer />
				</Box>
			</Router>
		</StoreContext.Provider>
	)
}
export default App
