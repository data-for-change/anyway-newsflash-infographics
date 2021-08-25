import React, { FC } from 'react';
import DialogWithHeader from 'components/molecules/DialogWithHeader';
import { Typography } from 'components/atoms';
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
    <DialogWithHeader title={t('aboutDialog.About')} isShowing={isShowing} onClose={onClose} maxWidth={maxWidth}>
      <article>
        <Box mb={1}>
          <Typography.Body5>{t('aboutDialog.Next challenge')}</Typography.Body5>
        </Box>
        <Box mb={1}>
          <Typography.Body5>{t('aboutDialog.The generated infographics')}</Typography.Body5>
        </Box>
        <Box>
          <Typography.Body5>
            {t('aboutDialog.We believe')}
            &nbsp;
            <a href={t('aboutDialog.linkUrl')} target="_blank" rel="noopener noreferrer">
              {t('aboutDialog.linkText')}
            </a>
          </Typography.Body5>
        </Box>
      </article>
    </DialogWithHeader>
  );
};

export default AboutDialog;
