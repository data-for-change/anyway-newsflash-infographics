import { observer } from 'mobx-react-lite';
import React from 'react';
import DialogWithHeader from './DialogWithHeader';
import { useTranslation } from 'react-i18next';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from 'components/atoms';
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
import { silverGrayColor, blackColor } from 'style';
import {
  cancelEditModeHelper,
  saveEditModeHelper,
  changeEditObjectHelper,
  changeCurrentSelectedRoleHelper,
  IeditObjList,
  IProps,
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

const AdminManagementForm: React.FC<IProps> = ({ labels, defaultValues, isShowing, onClose }) => {
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
  const OrganizationEditList: any = (props: any) => {
    const orgName = editObject[props.item.id]['organizationValue']
      ? editObject[props.item.id]['organizationValue']
      : props.item.roles;
    const [currentOrganization, setcurrentOrganization] = React.useState(orgName);
    const orgList = ['walla', 'ynet', 'papaya', 'lahaim', 'or yarok', 'kakal'];
    const handleChange = (e: any) => {
      setcurrentOrganization(e.target.value);
      const newObj = changeCurrentSelectedRoleHelper({ ...editObject }, props.item.id, e.target.value);
      setEditObject(newObj);
    };
    return (
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Organization</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            name={props.item.id}
            value={currentOrganization}
            label="Organization"
            onChange={handleChange}
          >
            {orgList.map((org) => {
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
  const OrganizationViewMode: any = (item: any) => {
    if (editObject[item.id]) {
      return <p>{editObject[item.id]['organizationValue']}</p>;
    } else {
      return <p>{item.roles}</p>;
    }
  };
  const cancelEditMode = (el: any) => {
    const newObj = cancelEditModeHelper(el, { ...editObject });
    setEditObject(newObj);
  };
  const saveEditMode = (element: any) => {
    const newObj = saveEditModeHelper(element, { ...editObject });
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
      <TableContainer style={{ maxHeight: 250 }}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <StyledTableRow>
              {labels.map((label: string, index: number) => (
                <StyledTableCell key={index}>
                  <Typography.Body5>{label}</Typography.Body5>
                </StyledTableCell>
              ))}
              <StyledTableCell></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {defaultValues.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.mail}</TableCell>
                <TableCell align="center" width="30%">
                  {editObject[item.id] && editObject[item.id]['editMode'] ? (
                    <OrganizationEditList item={item} />
                  ) : (
                    OrganizationViewMode(item)
                  )}
                </TableCell>
                <TableCell align="center" width="40%">
                  {editObject[item.id] && editObject[item.id]['editMode'] ? (
                    <EditMode itemData={item} />
                  ) : (
                    <ViewMode itemData={item} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" className={classes.saveButton}>
        {t('usersManagement.saveAll')}
      </Button>
    </DialogWithHeader>
  );
};
export default observer(AdminManagementForm);
