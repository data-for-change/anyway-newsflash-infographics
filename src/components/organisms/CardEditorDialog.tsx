import React, { FC, useState } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import { AnyWayButton } from '../atoms/AnyWayButton';
import AnyWaySlider from '../atoms/AnyWaySlider';

const TITLE = 'עריכת כרטיס';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const CardEditor: FC<IProps> = ({ isOpen, onClose, children }) => {
  const [cardSize, setCardSize] = useState(1);
  const handleSizeChange = (event: any, newSize: number | number[]) => {
    setCardSize(newSize as number);
  };
  const layoutHandler = () => {
    console.log('layout:');
  };
  console.log('cardSize:', cardSize);
  return (
    <DialogWithHeader fullWidth={true} isShowing={isOpen} onClose={onClose} title={TITLE}>
      <AnyWayButton onClick={layoutHandler}>לאורך/לרוחב</AnyWayButton>
      <AnyWaySlider onChange={handleSizeChange} />
    </DialogWithHeader>
  );
};

export default CardEditor;
