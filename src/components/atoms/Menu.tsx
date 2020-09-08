import React, { FC, ReactElement } from 'react';
import MaterialMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface IProps {
  items: Array<ReactElement>;
  handleClose: () => any;
  anchorEl: HTMLElement | null;
}
const Menu: FC<IProps> = ({ items, anchorEl, handleClose }) => {
  return (
    <div>
      <MaterialMenu id="menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {items.map((item, index) => {
          return (
            <MenuItem key={index}>
              {item}
            </MenuItem>
          );
        })}
      </MaterialMenu>
    </div>
  );
};
export default Menu;
