import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Typography } from 'components/atoms';
import React, { FC } from 'react';
import { blackColor, silverGrayColor } from 'style';
import { ITableData } from './formatTableData.service';

const PREFIX = 'TableView';

const classes = {
  table: `${PREFIX}-table`,
  root: `${PREFIX}-root`,
  sizeSmall: `${PREFIX}-sizeSmall`,
  head: `${PREFIX}-head`,
};

const StyledTable = styled(Table)(({ theme: Theme }) => ({
  [`&.${classes.table}`]: {
    border: `1px solid ${blackColor}`,
    borderBottom: 0,
    borderCollapse: 'separate',
  },
}));

interface IProps {
  data: ITableData;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`& .${classes.root}`]: {
    textAlign: 'center',
    padding: theme.spacing(0.7, 0),
    borderBottom: `1px solid ${blackColor}`,
  },
  [`& .${classes.sizeSmall}`]: {
    '&:last-child': {
      padding: theme.spacing(0.7, 1),
    },
  },
  [`& .${classes.head}`]: {
    backgroundColor: silverGrayColor,
    color: theme.palette.common.black,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme: Theme }) => ({
  [`& .${classes.root}`]: {
    // styles can be added here
  },
}));

const TableView: FC<IProps> = ({ data }) => {
  const { items, labels } = data;

  return (
    <StyledTable className={classes.table} size="small" aria-label="a dense table">
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
    </StyledTable>
  );
};
export default TableView;
