import React, { FC, useState } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import AnyWaySlider from '../atoms/AnyWaySlider';
import { useStore } from '../../store/storeConfig';
import WidgetWrapper from '../molecules/widgets/WidgetWrapper';
import { Box } from '@material-ui/core';
import AnyWayCard, { CardLayoutOptions } from '../molecules/AnyWayCard';
import { MetaTag, ErrorBoundary, Text, TextType, Button } from '../atoms';
import widgetToImage from '../../services/to-image.service';
import { useTranslation } from 'react-i18next';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  widgetName: string;
}

const CardEditor: FC<IProps> = ({ isOpen, onClose, widgetName }) => {
  const [cardElement, setCardElement] = useState({});
  const [landscape, setLandscape] = useState(false);
  const [size, setSize] = useState(1);
  const { t } = useTranslation();
  const store = useStore();
  const widget = store.getWidgetsDataByName(widgetName);
  const widgetComponent = !widget ? null : (
    <WidgetWrapper
      widget={widget}
      segmentText={store.newsFlashWidgetsMetaString}
      roadNumber={store.newsFlashWidgetsMetaNumber}
    />
  );

  // const widgetRef = useRef<HTMLDivElement>(null);
  const getCardRef = (element: HTMLElement) => setCardElement(element);
  const imgDownloadHandler = () => {
    if (cardElement && cardElement instanceof HTMLElement) {
      widgetToImage(widgetName, cardElement);
    }
  };

  const handleSizeChange = (event: any, newSize: number | number[]) => {
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
    <DialogWithHeader fullWidth={true} isShowing={isOpen} onClose={onClose} title={t('cardEditor.title')}>
      <Box display="flex">
        <Box px={2} display="flex" flexDirection="column" flexBasis={200} minWidth={200} boxSizing="border-box">
          <Box display="flex" flexDirection="column">
            <Text type={TextType.CONTENT_TITLE}>
              {t('cardEditor.mode') + ':' + t(landscape ? 'cardEditor.landscape' : 'cardEditor.portrait')}
            </Text>
            <Button.Standard onClick={layoutHandler}>
              {t('cardEditor.display') + ' ' + t(landscape ? 'cardEditor.portrait' : 'cardEditor.landscape')}
            </Button.Standard>
          </Box>
          <Box mt={2} display="flex" flexDirection="column">
            <Text type={TextType.CONTENT_TITLE}>{t('cardEditor.size')}</Text>
            <AnyWaySlider onChange={handleSizeChange} />
          </Box>
          <Box mt={2}>
            <Button.Standard onClick={imgDownloadHandler}>{t('cardEditor.download')}</Button.Standard>
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
