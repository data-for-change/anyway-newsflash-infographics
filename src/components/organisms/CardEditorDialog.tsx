import React, { FC, useState } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import { AnyWayButton } from '../atoms/AnyWayButton';
import AnyWaySlider from '../atoms/AnyWaySlider';
import { useStore } from '../../store/storeConfig';
import WidgetWrapper from '../molecules/widgets/WidgetWrapper';
import { Box } from '@material-ui/core';
import AnyWayCard, { CardLayoutOptions } from '../molecules/AnyWayCard';
import { MetaTag, ErrorBoundary } from '../atoms';

const TITLE = 'עריכת כרטיס';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  widgetName: string;
}

const CardEditor: FC<IProps> = ({ isOpen, onClose, widgetName }) => {
  const [landscape, setLandscape] = useState(false);
  const [size, setSize] = useState(1);
  const store = useStore();
  const widget = store.getWidgetsDataByName(widgetName);
  const widgetComponent = !widget ? null : (
    <WidgetWrapper widget={widget} segmentText={store.newsFlashWidgetsMetaString} />
  );

  const handleSizeChange = (event: any, newSize: number | number[]) => {
    console.log(newSize);
    setSize(newSize as number);
  };
  const layoutHandler = () => {
    setLandscape(!landscape);
  };
  const options: CardLayoutOptions = {
    landscape,
    size,
  };

  return (
    <DialogWithHeader fullWidth={true} isShowing={isOpen} onClose={onClose} title={TITLE}>
      <Box m={2} display="flex" justifyContent="center">
        <AnyWayCard widgetName={widgetName} actionButtons={false} layoutOptions={options}>
          <MetaTag>{widgetName}</MetaTag>
          <ErrorBoundary>{widgetComponent}</ErrorBoundary>
        </AnyWayCard>
      </Box>
      <AnyWayButton onClick={layoutHandler}>{landscape ? 'לאורך' : 'לרוחב'}</AnyWayButton>
      <AnyWaySlider onChange={handleSizeChange} />
    </DialogWithHeader>
  );
};

export default CardEditor;
