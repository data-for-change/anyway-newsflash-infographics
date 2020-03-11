import React, { FunctionComponent } from 'react'
import WidgetsTemplate from '../components/templates/WidgetsTemplate'
import { Box } from '@material-ui/core'
import { SideBar } from '../components/templates/SideBar'

interface IProps { }

const HomePage: FunctionComponent<IProps> = () => {

	return (
		<div style={{height:'100%'}}>
			<Box display='flex' flexGrow={1} >
				<Box flexBasis={300} flexShrink={0}>
					<SideBar />
				</Box>
				<Box flexGrow={1}>
					<WidgetsTemplate />
				</Box>
			</Box>
		</div>
	)
};

export default HomePage
