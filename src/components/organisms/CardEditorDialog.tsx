import React, { FC, useState } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import AnyWaySlider from '../atoms/AnyWaySlider';
import { useStore } from '../../store/storeConfig';
import WidgetWrapper from '../molecules/widgets/WidgetWrapper';
import { Box } from '@material-ui/core';
import AnyWayCard, { CardLayoutOptions } from '../molecules/AnyWayCard';
import { MetaTag, ErrorBoundary, Text, TextType, Button } from '../atoms';
import widgetToImage from '../../services/to-image.service';

const TITLE = 'עריכת כרטיס';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  widgetName: string;
}

const CardEditor: FC<IProps> = ({ isOpen, onClose, widgetName }) => {
  const [cardElement, setCardElement] = useState({});
  const [landscape, setLandscape] = useState(false);
  const [size, setSize] = useState(1);
  const store = useStore();
  const widget = store.getWidgetsDataByName(widgetName);
  const widgetComponent = !widget ? null : (
    <WidgetWrapper widget={widget} segmentText={store.newsFlashWidgetsMetaString} />
  );

  // const widgetRef = useRef<HTMLDivElement>(null);
  const getCardRef = (element: HTMLElement) => setCardElement(element);
  const imgDownloadHandler = () => {
    console.log(cardElement);

    if (cardElement && cardElement instanceof HTMLElement) {
      widgetToImage(widgetName, cardElement);
    }
  };

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
      <Box display="flex">
        <Box px={2} display="flex" flexDirection="column" flexBasis={200} minWidth={200} boxSizing="border-box">
          <Box display="flex" flexDirection="column">
            <Text type={TextType.CONTENT_TITLE}>
              מצב תצוגה:
              {landscape ? 'לרוחב' : 'לאורך'}
            </Text>
            <Button.Standard onClick={layoutHandler}>הצג {landscape ? 'לאורך' : 'לרוחב'}</Button.Standard>
          </Box>
          <Box mt={2} display="flex" flexDirection="column">
            <Text type={TextType.CONTENT_TITLE}>גודל</Text>
            <AnyWaySlider onChange={handleSizeChange} />
          </Box>
          <Box mt={2}>
            <Button.Standard onClick={imgDownloadHandler}>הורד כתמונה</Button.Standard>
          </Box>
        </Box>
        <Box px={2} display="flex" justifyContent="center" flexGrow={1}>
          <AnyWayCard getCardRef={getCardRef} widgetName={widgetName} actionButtons={false} layoutOptions={options}>
            <MetaTag>{widgetName}</MetaTag>
            <ErrorBoundary>{widgetComponent}</ErrorBoundary>
          </AnyWayCard>
        </Box>
      </Box>
    </DialogWithHeader>
  );
};

export default CardEditor;
