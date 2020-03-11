import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/AboutPage';
import { Footer } from './components/templates/Footer'
import {Box, createStyles, CssBaseline, makeStyles, Theme} from '@material-ui/core'
import { store, StoreContext } from './store/storeConfig'
import { Header } from './components/molecules/Header'

// main components height - must add up to 100
const headerHeight = '6vh';
const pageContentHeight = '88vh';
const footerHeight = '6vh';

const useStyles = makeStyles((theme: Theme) => createStyles({
	pageContent: {
		overflow: 'auto'
	},
}));

const App: React.FC = () => {
	const classes = useStyles();
	
	return (
		<StoreContext.Provider value={store}>
			<Router>
				<CssBaseline />
				<Box height={headerHeight}>
					<Header />
				</Box>
				<Box height={pageContentHeight} className={classes.pageContent}>
						<Switch>
							<Route exact path='/' component={HomePage} />
							<Route path='/about' component={About} />
						</Switch>
				</Box>
				<Box height={footerHeight}>
					<Footer />
				</Box>
			</Router>
		</StoreContext.Provider>
	)
};
export default App
