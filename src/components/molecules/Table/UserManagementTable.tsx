import React, { FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';


const UserManagementTable : FC = () => {
  return <Table>
    <TableHead>
      <TableRow>
        <TableCell>
          שם
        </TableCell>
        <TableCell>
          מייל
        </TableCell>
        <TableCell>
          ארגון
        </TableCell>
        <TableCell>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    </TableBody>
  </Table>
}

export default UserManagementTable
