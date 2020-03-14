import React, { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LocationMap from "../molecules/LocationMap";
import AnyWayCard from "../molecules/AnyWayCard";

interface IProps {}

const useStyles = makeStyles({
	sidebarFooter: {
		display: "flex",
		position: "sticky",
		maxHeight: "50px",
		bottom: 0,
		background: "white"
	}
});

export const AccidentMapLocation: FunctionComponent<IProps> = () => {
	const classes = useStyles();
	return (
		<div className={classes.sidebarFooter}>
			<AnyWayCard>
				<LocationMap marker={{ lat: 32.0853, lng: 34.7818 }} />
			</AnyWayCard>
		</div>
	);
};
