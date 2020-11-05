import React, { FC, useCallback } from 'react';
import { Typography } from '../atoms';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, List, ListItem } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { CalendarTodayOutlined } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useStore } from '../../store/storeConfig';

interface IProps {
  onChange: (value: number) => any;
}

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      textAlign: 'right',
    },
  }),
);

const SelectButton: FC<IProps> = ({ onChange }) => {
  const classes = useStyles();
  const store = useStore();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      onChange(event.target.value as number);
      const url: string = history.location.pathname;
      const queryPrefix = url.indexOf('?') === -1 ? '?' : '&';
      history.push(`${url}${queryPrefix}years_ago=${store.newsFlashWidgetsTimerFilter}`);
    },
    [onChange, history, store.newsFlashWidgetsTimerFilter],
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
            value={store.newsFlashWidgetsTimerFilter}
            onChange={handleChange}
          >
            <MenuItem value={1}>
              <Typography.Body4>{t('filterBar.Past Year')}</Typography.Body4>
            </MenuItem>
            <MenuItem value={3}>
              <Typography.Body4>{t('filterBar.Last 3 Years')}</Typography.Body4>
            </MenuItem>
            <MenuItem value={5}>
              <Typography.Body4>{t('filterBar.Last 5 Years')}</Typography.Body4>
            </MenuItem>
            <MenuItem value={8}>
              <Typography.Body4>{t('filterBar.Last 8 Years')}</Typography.Body4>
            </MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
};

export default SelectButton;
