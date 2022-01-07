import { Box } from '@mui/material';
import { Typography } from 'components/atoms';
import DialogWithHeader from 'components/molecules/DialogWithHeader';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

const maxWidth = 'sm';

interface IProps {
  isShowing: boolean;
  onClose: () => any;
}

const ThankYouDialog: FC<IProps> = ({ isShowing, onClose }) => {
  const { t } = useTranslation();
  return (
    <DialogWithHeader
      isShowing={isShowing}
      onClose={onClose}
      title={t('thankYouDialog.Acknowledgements')}
      maxWidth={maxWidth}
    >
      <article>
        <Box mb={1}>
          <Typography.Body5>{t('thankYouDialog.Developed by')}</Typography.Body5>
        </Box>
        <Typography.Body5>{t('thankYouDialog.names', { joinArrays: ', ' })}</Typography.Body5>
      </article>
    </DialogWithHeader>
  );
};

export default ThankYouDialog;
