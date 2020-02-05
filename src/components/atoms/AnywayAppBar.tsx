import React, {FunctionComponent} from "react";
import AppBar from "@material-ui/core/AppBar";
import {createStyles, makeStyles, Theme} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    backgroundColor: "#fafafa",
    height: "6vh",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "2vw",
    paddingRight: "2vw"
  },
}));

export const AnywayAppBar: FunctionComponent = ({children}) => {
  const classes = useStyles();
  
  return <AppBar className={classes.root}>{children}</AppBar>;
};
