import React, { FunctionComponent } from 'react'
import WidgetsTemplate from '../components/templates/WidgetsTemplate'
import { Box } from '@material-ui/core'
import { SideBar } from '../components/templates/SideBar'

interface IProps { }

const HomePage: FunctionComponent<IProps> = () => {
	return (
		<div>
			<Box display='flex' flexGrow={1}>
				<Box flexGrow={1}>
					<SideBar />
				</Box>
				<WidgetsTemplate />
			</Box>
		</div>
	)
}
export default HomePage
