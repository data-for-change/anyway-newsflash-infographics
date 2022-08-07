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
import { makeStyles } from "@material-ui/core/styles";

const bars_widgets_list = ["accident_count_by_accident_year", "injured_count_by_accident_year"]

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  widgetName: string;
  text: string | undefined;
}

const useStyles = makeStyles({
  checkbox: {
    defaultChecked: {},
    style: {
      color: blueVioletColor,
    },
    // onChange: handleCheckChange,
  },
});

const CardEditor: FC<IProps> = ({ isOpen, onClose, widgetName, text }) => {
  const [cardElement, setCardElement] = useState({});
  const [size, setSize] = useState(1);
  const { t } = useTranslation();
  const store = useStore();
  const { widgetsStore } = store;
  const widget = widgetsStore.getWidgetsDataByName(widgetName);
  const roadNumber = widgetsStore.newsFlashWidgetsMetaRoadNumber;
  const dateComment = widgetsStore.newsFlashWidgetsMetaDateComment;
  const classes = useStyles();

  const getCardRef = (element: HTMLElement) => setCardElement(element);
  const imgDownloadHandler = () => {
    if (cardElement && cardElement instanceof HTMLElement) {
      widgetToImage(widgetName, cardElement);
    }
  };

  const handleCheckChange = () => {
    // const { label_key } = dataPoint;
    // const yLabel = getTranslatedLabel(label_key, labelsMap);
    // result[yLabel] = 0;
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
          {bars_widgets_list.includes(widgetName) ?
            <Box mt={2} display="flex" flexDirection="column">
              <Typography.Title2>{t('cardEditor.Show Accidents')}</Typography.Title2>
              <FormGroup>
                <FormControlLabel label={t('textView.light.plural')} control={
                  <Checkbox className={classes.checkbox} />
                }/>
                <FormControlLabel label={t('textView.severe.plural')} control={
                  <Checkbox defaultChecked style={{color: blueVioletColor}} onChange={handleCheckChange} />
                }/>
                <FormControlLabel label={t('textView.fatal.plural')} control={
                  <Checkbox defaultChecked style={{color: blueVioletColor}} />
                }/>
              </FormGroup>
            </Box> : <Box></Box>
          }
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
