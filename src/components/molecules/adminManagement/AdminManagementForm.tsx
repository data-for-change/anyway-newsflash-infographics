import { observer } from 'mobx-react-lite';
import React from 'react';
import DialogWithHeader from '../DialogWithHeader';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from 'components/atoms';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import OverlayLoader from 'components/molecules/OverlayLoader';
import { StyledTableRow, StyledTableCell } from '../Table/TableView';
import { TableContainer, Button, Box, Table, TableBody, TableCell, TableHead, Theme } from '@material-ui/core';
import { blackColor } from 'style';
import { EditModeButtons } from './EditModeButtons';
import { OrganizationEditList } from './OrganizationEditList';
import { IusersForUpdateMap, IProps, labels, ISingleOrgDetails } from './AdminManagementFormHelpers';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    border: `1px solid ${blackColor}`,
    borderBottom: 0,
    borderCollapse: 'separate',
  },
  tableContainer: {
    maxHeight: 450,
    paddingBottom: 30,
  },
  saveButton: {
    marginTop: '20px',
    marginBottom: '10px',
  },
}));

const AdminManagementForm: React.FC<IProps> = ({ saveUserChanges, isShowing, onClose, loading }) => {
  const store: RootStore = useStore();
  const [usersToUpadte, setUsersForUpdate] = React.useState<IusersForUpdateMap>({});
  const { t } = useTranslation();
  const classes = useStyles();

  const setUsersForUpdateFunction = (newUsersForUpdate: IusersForUpdateMap) => {
    setUsersForUpdate(newUsersForUpdate);
  };

  const cancelEditMode = (email: string) => {
    const removeUsersFromUpdate = { ...usersToUpadte };
    delete removeUsersFromUpdate[email];
    setUsersForUpdate(removeUsersFromUpdate);
  };
  const saveEditModeAndDelete = (element: ISingleOrgDetails) => {
    saveUserChanges(element.email, element.org, usersToUpadte[element.email]);
    cancelEditMode(element.email);
  };
  const addUsersToUpdate = (element: ISingleOrgDetails) => {
    const addUserToUpdate = { ...usersToUpadte };
    addUserToUpdate[element.email] = element.name;
    setUsersForUpdate(addUserToUpdate);
  };
  return (
    <DialogWithHeader
      fullWidth
      maxWidth={'sm'}
      isShowing={isShowing}
      title={t('usersManagement.title')}
      onClose={() => {
        onClose();
      }}
    >
      <TableContainer className={classes.tableContainer}>
        <OverlayLoader show={loading} />
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              {labels.map((label: string, index: number) => (
                <StyledTableCell key={index}>
                  <Typography.Body5>{t(`userDetailsForm.${label}`)}</Typography.Body5>
                </StyledTableCell>
              ))}
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {store.usersManagementTableData &&
              store.usersManagementTableData.map((item: any, index: number) => (
                <StyledTableRow key={index}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center" width="30%">
                    {usersToUpadte[item.email] ? (
                      <OrganizationEditList
                        itemOrg={item.org}
                        itemEmail={item.email}
                        usersToUpadte={usersToUpadte}
                        organizationsList={store.organizationsList}
                        setUsersForUpdateFunction={setUsersForUpdateFunction}
                      />
                    ) : (
                      <p>{item.org}</p>
                    )}
                  </TableCell>
                  <TableCell align="center" width="40%">
                    {usersToUpadte[item.email] ? (
                      <EditModeButtons
                        saveEditModeAndDelete={saveEditModeAndDelete}
                        cancelEditMode={cancelEditMode}
                        itemData={item}
                      />
                    ) : (
                      <Box>
                        <Button onClick={() => addUsersToUpdate(item)} variant="contained">
                          {t('usersManagement.edit')}
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DialogWithHeader>
  );
};
export default observer(AdminManagementForm);
