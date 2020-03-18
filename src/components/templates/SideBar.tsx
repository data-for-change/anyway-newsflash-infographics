import React, { FunctionComponent } from "react";
import { Box, makeStyles } from "@material-ui/core";
import News from "./News";
import { NewsFlashFilterPanel } from "../atoms/NewsFlahsFilterPanel";

interface IProps {}

const useStyles = makeStyles({
	root: {
		borderLeft: "1px solid rgba(0, 0, 0, 0.12)"
	}
});

export const SideBar: FunctionComponent<IProps> = () => {
	const classes = useStyles();

	return (
		<Box className={classes.root}>
			<NewsFlashFilterPanel />
			<Box display="flex" flexDirection="column">
				<Box flexGrow="1">
					<News />
				</Box>
			</Box>
		</Box>
	);
};
