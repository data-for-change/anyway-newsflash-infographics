import { observer } from 'mobx-react-lite';
import React from 'react';
import DialogWithHeader from './DialogWithHeader';
import { useTranslation } from 'react-i18next';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from 'components/atoms';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import OverlayLoader from 'components/molecules/OverlayLoader';
import { silverGrayColor } from 'style';
import {
  TableContainer,
  Table,
  Box,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
  ButtonGroup,
  Button,
} from '@material-ui/core';
import { blackColor } from 'style';
import {
  cancelEditModeHelper,
  changeEditObjectHelper,
  changeCurrentSelectedRoleHelper,
  IeditObjList,
  IProps,
  labels,
} from './AdminManagementFormHelpers';
const useStyles = makeStyles((theme: Theme) => ({
  table: {
    border: `1px solid ${blackColor}`,
    borderBottom: 0,
    borderCollapse: 'separate',
  },
  saveButton: {
    marginTop: '20px',
    marginBottom: '10px',
  },
}));
const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      padding: theme.spacing(0.7, 0),
      borderBottom: `1px solid ${blackColor}`,
    },
    sizeSmall: {
      '&:last-child': {
        padding: theme.spacing(0.7, 1),
      },
    },
    head: {
      backgroundColor: silverGrayColor,
      color: theme.palette.common.black,
    },
  }),
)(TableCell);
const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
      // styles can be added here
    },
  }),
)(TableRow);
const AdminManagementForm: React.FC<IProps> = ({ saveEditModeHelper, isShowing, onClose, loading }) => {
  const store: RootStore = useStore();
  const [editObject, setEditObject] = React.useState<IeditObjList>({});

  const { t } = useTranslation();
  const classes = useStyles();
  const EditMode: any = (props: any) => {
    return (
      <ButtonGroup>
        <Button variant="contained" onClick={() => saveEditMode(props.itemData)}>
          {t('usersManagement.save')}
        </Button>
        <Button variant="contained" onClick={() => cancelEditMode(props.itemData)}>
          {t('usersManagement.cancel')}
        </Button>
      </ButtonGroup>
    );
  };
  const ViewMode = (props: any) => {
    return (
      <Button onClick={() => changeEditObject(props.itemData)} variant="contained">
        {t('usersManagement.edit')}
      </Button>
    );
  };
  const OrganizationEditList: any = ({ itemOrg, itemEmail }: any) => {
    const orgName = editObject[itemEmail]['organizationValue'] ? editObject[itemEmail]['organizationValue'] : itemOrg;
    const [currentOrganization, setcurrentOrganization] = React.useState(orgName);
    const handleChange = (e: any) => {
      setcurrentOrganization(e.target.value);
      const newObj = changeCurrentSelectedRoleHelper({ ...editObject }, itemEmail, e.target.value);
      setEditObject(newObj);
    };
    return (
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{t('userDetailsForm.Organization')}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name={itemEmail}
            value={currentOrganization}
            label="Organization"
            onChange={handleChange}
          >
            {store.organizationsList &&
              store.organizationsList.map((org: any) => {
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
  const cancelEditMode = (el: any) => {
    const newObj = cancelEditModeHelper(el.email, { ...editObject });
    setEditObject(newObj);
  };
  const saveEditMode = (element: any) => {
    const newObj = saveEditModeHelper(element.email, element.org, { ...editObject });
    setEditObject(newObj);
  };
  const changeEditObject = (element: any) => {
    const newObj = changeEditObjectHelper(element, { ...editObject });
    setEditObject(newObj);
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
      <TableContainer style={{ maxHeight: 250, paddingBottom: 30 }}>
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
                      <OrganizationEditList itemOrg={item.org} itemEmail={item.email} />
                    ) : (
                      <p>{item.org}</p>
                    )}
                  </TableCell>
                  <TableCell align="center" width="40%">
                    {editObject[item.email] ? <EditMode itemData={item} /> : <ViewMode itemData={item} />}
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
