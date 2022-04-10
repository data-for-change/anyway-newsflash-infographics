import React, { FC, useState } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import { useStore } from 'store/storeConfig';
import WidgetWrapper from 'components/molecules/widgets/WidgetWrapper';
import { Box } from '@material-ui/core';
import AnyWayCard, { CardSizeOptions } from 'components/molecules/card/AnyWayCard';
import { MetaTag, ErrorBoundary, Typography, Button, Slider } from 'components/atoms';
import widgetToImage from 'services/to-image.service';
import { useTranslation } from 'react-i18next';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  widgetName: string;
  text: string | undefined;
}

const CardEditor: FC<IProps> = ({ isOpen, onClose, widgetName, text }) => {
  const [cardElement, setCardElement] = useState({});
  const [size, setSize] = useState(1);
  const { t } = useTranslation();
  const store = useStore();
  const { widgetsStore } = store;
  const widget = widgetsStore.getWidgetsDataByName(widgetName);
  const roadNumber = widgetsStore.newsFlashWidgetsMetaRoadNumber;
  const dateComment = widgetsStore.newsFlashWidgetsMetaDateComment;

  const getCardRef = (element: HTMLElement) => setCardElement(element);
  const imgDownloadHandler = () => {
    if (cardElement && cardElement instanceof HTMLElement) {
      widgetToImage(widgetName, cardElement);
    }
  };

  const handleSizeChange = (event: any, newSize: number | number[]) => {
    setSize(newSize as number);
  };

  const sizeOptions: CardSizeOptions = {
    size,
  };
  const widgetComponent = !widget ? null : (
    <WidgetWrapper
      segmentText={widgetsStore.newsFlashWidgetsMetaSegmentName}
      widget={widget}
      locationText={widgetsStore.newsFlashWidgetsMetaLocation}
      sizeOptions={sizeOptions.size}
    />
  );

  return (
    <DialogWithHeader fullWidth={true} isShowing={isOpen} onClose={onClose} title={t('cardEditor.edit')}>
      <Box display="flex">
        <Box px={2} display="flex" flexDirection="column" flexBasis={200} minWidth={200} boxSizing="border-box">
          <Box mt={2} display="flex" flexDirection="column">
            <Typography.Body5>{t('cardEditor.size')}</Typography.Body5>
            <Slider onChange={handleSizeChange} />
          </Box>
          <Box mt={2}>
            <Button.Standard onClick={imgDownloadHandler}>
              <Typography.Body5>{t('cardEditor.download')}</Typography.Body5>
            </Button.Standard>
          </Box>
        </Box>
        <Box px={2} display="flex" justifyContent="center" flexGrow={1}>
          <AnyWayCard
            getCardRef={getCardRef}
            widgetName={widgetName}
            roadNumber={roadNumber}
            actionButtons={false}
            sizeOptions={sizeOptions}
            dateComment={dateComment}
            title={text}
          >
            <MetaTag>{widgetName}</MetaTag>
            <ErrorBoundary>{widgetComponent}</ErrorBoundary>
          </AnyWayCard>
        </Box>
      </Box>
    </DialogWithHeader>
  );
};

export default CardEditor;
