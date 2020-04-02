import React, { FunctionComponent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ListItemIcon, List, ListItem } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { CalendarTodayOutlined } from "@material-ui/icons";

interface IProps {}

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 120,
      maxWidth: 300,
      textAlign: "right"
    }
  })
);

const SelectButton: FunctionComponent<IProps> = ({ children }) => {
  const classes = useStyles();
  const [date, setDate] = React.useState<string | number>(1);
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDate(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <List component="nav" aria-label="main mailbox folders">
      <ListItem>
        <ListItemIcon>
          <CalendarTodayOutlined />
        </ListItemIcon>
        <FormControl className={classes.formControl}>
          <Select
            labelId="controlled-open-select-label"
            id="controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={date}
            onChange={handleChange}
          >
            <MenuItem value={1}>שנה אחרונה</MenuItem>
            <MenuItem value={3}>3 שנים אחרונות</MenuItem>
            <MenuItem value={8}>8 שנים אחרונות</MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
};

export default SelectButton;
