import React, { FC } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import { Typography } from '../atoms';
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
          <Typography.Body5>{t('thankYouDialog.contentTitle')}</Typography.Body5>
        </Box>
        <Typography.Body5>{t('thankYouDialog.names', { joinArrays: ', ' })}</Typography.Body5>
      </article>
    </DialogWithHeader>
  );
};

export default ThankYouDialog;
