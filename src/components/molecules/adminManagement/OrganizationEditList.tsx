import { useTranslation } from 'react-i18next';
import { Box, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
import React from 'react';

export const OrganizationEditList: any = ({
  itemOrg,
  itemEmail,
  usersToUpadte,
  organizationsList,
  setUsersForUpdateFunction,
}: any) => {
  const { t } = useTranslation();

  const [currentOrganization, setcurrentOrganization] = React.useState(itemOrg);
  const handleChange = (e: any) => {
    setcurrentOrganization(e.target.value);
    const newObj = { ...usersToUpadte };
    newObj[itemEmail] = e.target.value;

    setUsersForUpdateFunction(newObj);
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
