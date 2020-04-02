import React, { FunctionComponent } from "react";
import { makeStyles, createStyles, Divider } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { AppBar, Toolbar } from "@material-ui/core";
import SelectButton from "../atoms/SelectButton";

interface IProps {}

const useStyles = makeStyles(() =>
  createStyles({
    grow: {
      flexGrow: 1
    }
  })
);

const FilterBar: FunctionComponent<IProps> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.grow}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar variant="dense">
          <div className="filters">
            <SelectButton />
            <SelectButton />
            <SelectButton />
          </div>
        </Toolbar>
      </AppBar>
      <Divider />
    </Box>
  );
};

export default FilterBar;
