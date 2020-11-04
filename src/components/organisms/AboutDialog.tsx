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

const AboutDialog: FC<IProps> = ({ isShowing, onClose }) => {
  const { t } = useTranslation();
  return (
    <DialogWithHeader title={t('aboutDialog.title')} isShowing={isShowing} onClose={onClose} maxWidth={maxWidth}>
      <article>
        <Box mb={1}>
          <Typography.Body5>{t('aboutDialog.content1')}</Typography.Body5>
        </Box>
        <Box mb={1}>
          <Typography.Body5>{t('aboutDialog.content2')}</Typography.Body5>
        </Box>
        <Box>
          <Typography.Body5>
            {t('aboutDialog.content3')}
            &nbsp;
            <a href={t('aboutDialog.linkUrl')}>{t('aboutDialog.linkText')}</a>
          </Typography.Body5>
        </Box>
      </article>
    </DialogWithHeader>
  );
};

export default AboutDialog;
