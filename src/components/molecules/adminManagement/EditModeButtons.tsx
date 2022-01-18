import { ButtonGroup, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const EditModeButtons: any = ({ saveEditMode, cancelEditMode, itemData }: any) => {
  const { t } = useTranslation();
  return (
    <ButtonGroup>
      <Button variant="contained" onClick={() => saveEditMode(itemData)}>
        {t('usersManagement.save')}
      </Button>
      <Button variant="contained" onClick={() => cancelEditMode(itemData)}>
        {t('usersManagement.cancel')}
      </Button>
    </ButtonGroup>
  );
};
