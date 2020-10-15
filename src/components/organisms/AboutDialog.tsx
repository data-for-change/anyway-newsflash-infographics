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

const AboutDialog: FC<IProps> = ({ isShowing, onClose }) => {
  const { t } = useTranslation();
  return (
    <DialogWithHeader title={t('aboutDialog.title')} isShowing={isShowing} onClose={onClose} maxWidth={maxWidth}>
      <article>
        <Box mb={1}>
          <Text type={TextType.CONTENT}>{t('aboutDialog.content1')}</Text>
        </Box>
        <Box mb={1}>
          <Text type={TextType.CONTENT}>{t('aboutDialog.content2')}</Text>
        </Box>
        <Box>
          <Text type={TextType.CONTENT}>
            {t('aboutDialog.content3')}
            &nbsp;
            <a href={t('aboutDialog.linkUrl')} target="blank">
              {t('aboutDialog.linkText')}
            </a>
          </Text>
        </Box>
      </article>
    </DialogWithHeader>
  );
};

export default AboutDialog;
