import React, { FC } from 'react';
import { makeStyles, withStyles, createStyles } from '@material-ui/core/styles';
import { Typography } from 'components/atoms';
import { Table, TableBody, TableCell, TableHead, TableRow, Theme } from '@material-ui/core';
import { silverGrayColor, blackColor } from 'style';
import { ITableData } from './formatTableData.service';

interface IProps {
  data: ITableData;
}

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    border: `1px solid ${blackColor}`,
    borderBottom: 0,
    borderCollapse: 'separate',
  },
}));

export const StyledTableCell = withStyles((theme: Theme) =>
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

export const StyledTableRow = withStyles(() =>
  createStyles({
    root: {
    },
  }),
)(TableRow);

const TableView: FC<IProps> = ({ data }) => {
  const classes = useStyles();
  const { items, labels } = data;

  return (
    <Table className={classes.table} size="small" aria-label="a dense table">
      <TableHead>
        <StyledTableRow>
          {labels.map((label: string, index: number) => (
            <StyledTableCell key={index}>
              <Typography.Body5>{label}</Typography.Body5>
            </StyledTableCell>
          ))}
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {items.map((item: Array<string | number>, index: number) => (
          <StyledTableRow key={index}>
            {item.map((i: string | number, index: number) => (
              <StyledTableCell key={index} scope="row">
                <Typography.Body6>{i}</Typography.Body6>
              </StyledTableCell>
            ))}
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default TableView;
