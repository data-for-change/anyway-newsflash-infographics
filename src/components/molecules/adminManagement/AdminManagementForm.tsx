import { observer } from 'mobx-react-lite';
import React from 'react';
import DialogWithHeader from '../DialogWithHeader';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from 'components/atoms';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import OverlayLoader from 'components/molecules/OverlayLoader';
import { StyledTableCell, StyledTableRow } from '../Table/TableView';
import { maxHeightTable } from 'style/_sizes';
import { TableContainer, Button, Box, Table, TableBody, TableCell, TableHead, Theme } from '@material-ui/core';
import { blackColor } from 'style';
import { EditModeButtons } from './EditModeButtons';
import { OrganizationEditList } from './OrganizationEditList';
import { IusersForUpdateMap, IProps, labels, ISingleOrgDetails } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    border: `1px solid ${blackColor}`,
    borderBottom: 0,
    borderCollapse: 'separate',
  },
  tableContainer: {
    maxHeight: maxHeightTable,
    paddingBottom: theme.spacing(3),
  },
  row: {
    height: '65px',
  },
}));

const AdminManagementForm: React.FC<IProps> = ({ saveUserChanges, isShowing, onClose, loading }) => {
  const store: RootStore = useStore();
  const { userStore } = store;
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
      maxWidth={'md'}
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
            {userStore.usersManagementTableData &&
              userStore.usersManagementTableData.map((item: any, index: number) => (
                <StyledTableRow className={classes.row} key={index}>
                  <TableCell align="center" width={'20%'}>
                    {item.name}
                  </TableCell>
                  <TableCell align="center" width={'20%'}>
                    {item.email}
                  </TableCell>
                  <TableCell align="center" width={'25%'}>
                    {usersToUpadte[item.email] ? (
                      <OrganizationEditList
                        itemOrg={item.org}
                        itemEmail={item.email}
                        usersToUpadte={usersToUpadte}
                        organizationsList={userStore.organizationsList}
                        setUsersForUpdateFunction={setUsersForUpdateFunction}
                      />
                    ) : (
                      <Typography.Body2>{item.org}</Typography.Body2>
                    )}
                  </TableCell>
                  <TableCell align="center" width={'35%'}>
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
