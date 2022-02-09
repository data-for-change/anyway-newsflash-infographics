import { ButtonGroup, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { IPropsEditButtons } from './types';
import React from 'react';

export const EditModeButtons: React.FC<IPropsEditButtons> = ({ saveEditModeAndDelete, cancelEditMode, itemData }) => {
  const { t } = useTranslation();
  return (
    <ButtonGroup>
      <Button variant="contained" onClick={() => saveEditModeAndDelete(itemData)}>
        {t('usersManagement.save')}
      </Button>
      <Button variant="contained" onClick={() => cancelEditMode(itemData.email)}>
        {t('usersManagement.cancel')}
      </Button>
    </ButtonGroup>
  );
};
