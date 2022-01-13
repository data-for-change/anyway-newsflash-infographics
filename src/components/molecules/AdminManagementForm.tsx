import { observer } from 'mobx-react-lite';
import React from 'react';
import DialogWithHeader from './DialogWithHeader';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from 'components/atoms';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import OverlayLoader from 'components/molecules/OverlayLoader';
import { StyledTableRow, StyledTableCell } from './Table/TableView';
import { TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Theme } from '@material-ui/core';
import { blackColor } from 'style';
import {
  OrganizationEditList,
  IeditObjList,
  EditModeButtons,
  ViewMode,
  IProps,
  labels,
} from './AdminManagementFormHelpers';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    border: `1px solid ${blackColor}`,
    borderBottom: 0,
    borderCollapse: 'separate',
  },
  tableContainer: {
    maxHeight: 250,
    paddingBottom: 30,
  },
  saveButton: {
    marginTop: '20px',
    marginBottom: '10px',
  },
}));

const AdminManagementForm: React.FC<IProps> = ({ saveEditModeHelper, isShowing, onClose, loading }) => {
  const store: RootStore = useStore();
  const [editObject, setEditObject] = React.useState<IeditObjList>({});

  const { t } = useTranslation();
  const classes = useStyles();

  const setEditObjectFunction = (newEditObject: any) => {
    setEditObject(newEditObject);
  };

  const cancelEditMode = (el: any) => {
    const newObj = { ...editObject };
    delete newObj[el.email];
    setEditObject(newObj);
  };
  const saveEditMode = (element: any) => {
    const newObj = saveEditModeHelper(element.email, element.org, { ...editObject });
    setEditObject(newObj);
  };
  const changeEditObject = (element: any) => {
    const newEditObject = { ...editObject };
    newEditObject[element.email] = { organizationValue: element.name };
    setEditObject(newEditObject);
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
                <TableRow key={index}>
                  <TableCell align="center">{item.name}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center" width="30%">
                    {editObject[item.email] ? (
                      <OrganizationEditList
                        itemOrg={item.org}
                        itemEmail={item.email}
                        editObject={editObject}
                        organizationsList={store.organizationsList}
                        setEditObjectFunction={setEditObjectFunction}
                      />
                    ) : (
                      <p>{item.org}</p>
                    )}
                  </TableCell>
                  <TableCell align="center" width="40%">
                    {editObject[item.email] ? (
                      <EditModeButtons saveEditMode={saveEditMode} cancelEditMode={cancelEditMode} itemData={item} />
                    ) : (
                      <ViewMode changeEditObject={changeEditObject} itemData={item} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DialogWithHeader>
  );
};
export default observer(AdminManagementForm);
