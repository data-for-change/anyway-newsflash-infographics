import React, { FC } from 'react';
import MaterialMenu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Text, TextType } from '../atoms';

interface IProps {
  data: Array<any>;
  handleClose: () => any;
  anchorEl: HTMLElement | null;
  handleChoice: (value: any) => any;
}
const Menu: FC<IProps> = ({ data, anchorEl, handleClose, handleChoice }) => {
  return (
    <div>
      <MaterialMenu id="menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {data.map((option, index) => {
          return (
            <MenuItem key={index} onClick={() => handleChoice(option.value)}>
              <Text type={TextType.CONTENT_TITLE}>{option.buttonText}</Text>
            </MenuItem>
          );
        })}
      </MaterialMenu>
    </div>
  );
};
export default Menu;
