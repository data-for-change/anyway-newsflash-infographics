import MaterialMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { FC, ReactElement } from 'react';
interface IProps {
  items: Array<ReactElement>;
  handleClose: () => any;
  anchorEl: HTMLElement | null;
}
const Menu: FC<IProps> = ({ items, anchorEl, handleClose }) => {
  return (
    <div>
      <MaterialMenu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {items.map((item, index) => {
          return (
            <MenuItem onClick={handleClose} key={index}>
              {item}
            </MenuItem>
          );
        })}
      </MaterialMenu>
    </div>
  );
};
export default Menu;
