import React, { FC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { AnyWayButton } from '../atoms/AnyWayButton';
import AnyWaySlider from '../atoms/AnyWaySlider';

interface IProps {
  isOpen: boolean;
  onCardSizeChange: (event: any, newSize: number) => void;
  onLayoutChange: () => void;
  onClose: () => void;
}
const useStyles = makeStyles({
  actionBar: {
    padding: '8px 24px',
    justifyContent: 'space-between',
  },
});
const CardEditorView: FC<IProps> = ({ onCardSizeChange, onLayoutChange, children, isOpen, onClose }) => {
  const classes = useStyles();
  return (
    <Dialog fullWidth={true} maxWidth={'md'} open={isOpen} onClose={onClose}>
      <DialogTitle>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions className={classes.actionBar}>
        <AnyWayButton onClick={onLayoutChange}>לאורך/לרוחב</AnyWayButton>
        <AnyWaySlider onChange={onCardSizeChange} />
      </DialogActions>
    </Dialog>
  );
};
export default CardEditorView;
