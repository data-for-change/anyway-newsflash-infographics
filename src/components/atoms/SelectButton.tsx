import React, { FC, useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, List, ListItem } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { CalendarTodayOutlined } from '@material-ui/icons';

interface IProps {
  onChange: (value: number) => any;
  initialValue: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 120,
      maxWidth: 300,
      textAlign: 'right',
    },
  }),
);

const SelectButton: FC<IProps> = ({ onChange, initialValue }) => {
  const classes = useStyles();
  const [selectValue, setsSelectValue] = React.useState<string | number>(0);
  const [open, setOpen] = React.useState(false);

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setsSelectValue(event.target.value as number);
      onChange(event.target.value as number);
    },
    [setsSelectValue, onChange],
  );

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
            value={selectValue}
            onChange={handleChange}
          >
            <MenuItem value={0}>הכל</MenuItem>
            <MenuItem value={1}>שנה אחרונה</MenuItem>
            <MenuItem value={3}>3 שנים אחרונות</MenuItem>
            <MenuItem value={5}>5 שנים אחרונות</MenuItem>
            <MenuItem value={8}>8 שנים אחרונות</MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
};

export default SelectButton;
