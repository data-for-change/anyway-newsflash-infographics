import React, { FC } from 'react';
import { Table, TableBody, TableHead } from '@material-ui/core';

import { Text, TextType } from '../../atoms';
import { UseTableStyles, StyledTableRow, StyledTableCell } from '../TableView';

import { IWidgetRainAccidentsBySeverity } from '../../../models/WidgetData';

const SEVERITY = 'severity';
const SEVERITY_HEBREW = 'severity_hebrew';
const AMOUNT = 'amount_of_accidents_caused_by_rain';
const PERCENT = 'accidents_caused_by_rain_percentage';

interface IProps {
  data: IWidgetRainAccidentsBySeverity;
}

const RainAccidentsBySeverity: FC<IProps> = ({ data }) => {
  const classes = UseTableStyles();
  const { items, text } = data;
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Text type={TextType.WIDGET_TABLE_TITLE}>{text.title}</Text>
      </div>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>
              <Text type={TextType.WIDGET_TABLE_HEADER}>חומרת התאונה</Text>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Text type={TextType.WIDGET_TABLE_HEADER}>כמות התאונות שנגרמו על ידי גשם</Text>
            </StyledTableCell>
            <StyledTableCell align="right">
              <Text type={TextType.WIDGET_TABLE_HEADER}>אחוז התאונות שנגרמו על ידי גשם</Text>
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {items
            .sort((previousItem, currentItem) => previousItem[SEVERITY] - currentItem[SEVERITY])
            .map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  <Text type={TextType.WIDGET_TABLE_CONTENT}>{item[SEVERITY_HEBREW]}</Text>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Text type={TextType.WIDGET_TABLE_CONTENT}>{item[AMOUNT]}</Text>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Text type={TextType.WIDGET_TABLE_CONTENT}>{item[PERCENT]}%</Text>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default RainAccidentsBySeverity;
