import React, { FC, useState } from 'react';
import CardEditorView from '../molecules/CardEditorView';

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
    <CardEditorView
      onCardSizeChange={handleSizeChange}
      onLayoutChange={layoutHandler}
      children={children}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default CardEditor;
