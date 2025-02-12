import { IInternalTxs } from '@/common/interfaces/Txs';
import ToolTip from '@/components/ui/ToolTip';
import React from 'react';
import { Table, TableCell, TableHeader, TableRow } from '../ui/Table';
import Status from '../ui/Status';
import Badge from '../ui/Badge';
import { parseDecimals } from '@/common/utils/ParseDecimals';

type props = {
  itxs: IInternalTxs[] | undefined;
};

function InternalTxsTable({ itxs }: props) {
  return (
    <Table>
      <TableHeader>
        <TableCell>Type</TableCell>
        <TableCell>ID</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>From</TableCell>
        <TableCell>To</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Fee</TableCell>
      </TableHeader>
      {itxs?.map((itx, i) => (
        <TableRow key={i}>
          <TableCell>
            <Badge
              className="capitalize"
              text={itx.action?.callType}
              type="info"
            />
          </TableCell>
          <TableCell>
            <ToolTip text={itx.internalTxId} type="itx" />
          </TableCell>
          <TableCell>
            <Status type={itx.error === null ? 'SUCCESS' : 'FAIL'} />
          </TableCell>
          <TableCell className="text-brand-orange">
            <ToolTip text={itx.action?.from} type="address" />
          </TableCell>
          <TableCell>
            <ToolTip text={itx.action?.to} type="address" />
          </TableCell>
          <TableCell>{parseDecimals(itx.action.value, 4)}</TableCell>
          <TableCell>{itx.action.gas}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export default InternalTxsTable;
