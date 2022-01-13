import React from 'react';
import { Box, InputLabel, MenuItem, Select, FormControl, ButtonGroup, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export const labels = ['Name', 'Email', 'Organization'];

export interface IeditObjList {
  [key: string]: { organizationValue: string };
}

export interface IProps {
  isShowing: boolean;
  onClose: () => void;
  saveEditModeHelper: any;
  loading: boolean;
}

export const OrganizationEditList: any = ({
  itemOrg,
  itemEmail,
  editObject,
  organizationsList,
  setEditObjectFunction,
}: any) => {
  const { t } = useTranslation();

  const [currentOrganization, setcurrentOrganization] = React.useState(itemOrg);
  const handleChange = (e: any) => {
    setcurrentOrganization(e.target.value);
    const newObj = { ...editObject };
    newObj[itemEmail] = {
      organizationValue: e.target.value,
    };
    setEditObjectFunction(newObj);
  };
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>{t('userDetailsForm.Organization')}</InputLabel>
        <Select name={itemEmail} value={currentOrganization} label="Organization" onChange={handleChange}>
          {organizationsList &&
            organizationsList.map((org: any) => {
              return (
                <MenuItem key={org} value={org}>
                  {org}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </Box>
  );
};

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

export const ViewMode = ({ changeEditObject, itemData }: any) => {
  const { t } = useTranslation();
  return (
    <Button onClick={() => changeEditObject(itemData)} variant="contained">
      {t('usersManagement.edit')}
    </Button>
  );
};
