import { useTranslation } from 'react-i18next';
import { Box, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
import { IPropsSelectBox } from './types';
import React from 'react';

export const OrganizationEditList: React.FC<IPropsSelectBox> = ({
  itemOrg,
  itemEmail,
  usersToUpadte,
  organizationsList,
  setUsersForUpdateFunction,
}) => {
  const { t } = useTranslation();

  const [currentOrganization, setcurrentOrganization] = React.useState(itemOrg);
  const handleChange = (e: any) => {
    setcurrentOrganization(e.target.value);
    const changeUsersForUpdate = { ...usersToUpadte };
    changeUsersForUpdate[itemEmail] = e.target.value;

    setUsersForUpdateFunction(changeUsersForUpdate);
  };
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>{t('userDetailsForm.Organization')}</InputLabel>
        <Select
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
          name={itemEmail}
          value={currentOrganization}
          label="Organization"
          onChange={handleChange}
        >
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
