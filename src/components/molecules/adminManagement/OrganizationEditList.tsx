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
  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const selectedOrg : string = e.target.value as string;
    setcurrentOrganization(selectedOrg);
    const changeUsersForUpdate = { ...usersToUpadte };
    changeUsersForUpdate[itemEmail] = {...changeUsersForUpdate[itemEmail], org : selectedOrg};

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
            organizationsList.map((org: string) => {
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
