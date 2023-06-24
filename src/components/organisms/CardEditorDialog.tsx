import React, { FC, useState } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import { useStore } from 'store/storeConfig';
import WidgetWrapper from 'components/molecules/widgets/WidgetWrapper';
import { Box, Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import AnyWayCard, { CardSizeOptions } from 'components/molecules/card/AnyWayCard';
import { MetaTag, ErrorBoundary, Typography, Button, Slider } from 'components/atoms';
import widgetToImage from 'services/to-image.service';
import { useTranslation } from 'react-i18next';
import { blueVioletColor } from 'style';

import {initEditorBarOptions, barsWidgetsLabels, barsWidgetsTitle, NUM_OF_BARS} from 'utils/barChart.utils';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  widgetName: string;
  text?: string;
}

const CardEditor: FC<IProps> = ({ isOpen, onClose, widgetName, text }) => {
  const [cardElement, setCardElement] = useState({});
  const [size, setSize] = useState(1)
  const [barValues, setBarValues] = useState(initEditorBarOptions());
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

  /**
   * When checkbox is changed, change barValues in place "location" to the
   * negated value. When false change to true, when true change to false.
   * @param location  place in barValues object
   * @param event     not used
   */
  const handleCheckChange = (location: number, event: any) => {
    setBarValues((prevState) => ({
      ...prevState,
      [location]: !barValues[location]
    }));
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
      editorBarOptions={barValues}
      isStreet={widgetsStore.isStreet}
    />
  );

  const onCloseInitValues = () => {
    onClose();
    setSize(1);
    setBarValues(initEditorBarOptions());
  }

  return (
    <DialogWithHeader fullWidth={true} isShowing={isOpen} onClose={onCloseInitValues} title={t('cardEditor.edit')}>
      <Box display="flex">
        <Box px={2} display="flex" flexDirection="column" flexBasis={200} minWidth={200} boxSizing="border-box">
          {Object.keys(barsWidgetsLabels).includes(widgetName) ?
            <Box mt={2} display="flex" flexDirection="column">
              <Typography.Body1>{t(barsWidgetsTitle[widgetName])}</Typography.Body1>
              <FormGroup>
                {Array.from({length: NUM_OF_BARS}, (_,i) => {
                  return <FormControlLabel label={t(barsWidgetsLabels[widgetName][i])} control={
                    <Checkbox defaultChecked style={{color: blueVioletColor}}
                              onChange={(e) => handleCheckChange(i, e)}/>
                  }/>
                })}
              </FormGroup>
            </Box> : <Box></Box>
          }
          <Box mt={2} display="flex" flexDirection="column">
            <Typography.Body1>{t('cardEditor.size')}</Typography.Body1>
            <Slider onChange={handleSizeChange} />
          </Box>
          <Box mt={2}>
            <Button.Standard onClick={imgDownloadHandler}>
              <Typography.Body1>{t('cardEditor.download')}</Typography.Body1>
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
