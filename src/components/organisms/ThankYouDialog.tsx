import React, { FC } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import { Text, TextType } from '../atoms';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const maxWidth = 'sm';

interface IProps {
  isShowing: boolean;
  onClose: () => any;
}

const ThankYouDialog: FC<IProps> = ({ isShowing, onClose }) => {
  const { t } = useTranslation();
  return (
    <DialogWithHeader isShowing={isShowing} onClose={onClose} title={t('thankYouDialog.title')} maxWidth={maxWidth}>
      <article>
        <Box mb={1}>
          <Text type={TextType.CONTENT_TITLE}>{t('thankYouDialog.contentTitle')}</Text>
        </Box>
        <Text type={TextType.CONTENT}>{t('thankYouDialog.names', { joinArrays: ', ' })}</Text>
      </article>
    </DialogWithHeader>
  );
};

export default ThankYouDialog;
