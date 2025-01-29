import { ROUTER } from '@/common/constants';
import { IInternalTxs } from '@/common/interfaces/Txs';
import { parseDate } from '@/common/utils/Time';
import ToolTip from '@/components/ui/ToolTip';
import React from 'react';
import { Table, TableCell, TableHeader, TableRow } from '../ui/Table';
import Status from '../ui/Status';
import Badge from '../ui/Badge';

type props = {
  itxs: IInternalTxs[] | undefined
}

function InternalTxsTable({ itxs }: props) {
  return (
    <Table>
      <TableHeader>
        <TableCell>Type</TableCell>
        <TableCell>ID</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>From</TableCell>
        <TableCell>To</TableCell>
        <TableCell>Value</TableCell>
      </TableHeader>
      {
        itxs?.map((itx, i) => (
          <TableRow key={i}>
            <TableCell>
              <Badge
                className='capitalize'
                text={itx.action?.callType}
                type='info'
              />
            </TableCell>
            <TableCell>
              <ToolTip href={`${ROUTER.ITXS.INDEX}/${itx.internalTxId}`}
                text={itx.internalTxId}              
              />
            </TableCell>
            <TableCell>
              <Status value={itx.error === null} />
            </TableCell>
            <TableCell className="text-brand-orange">
              <ToolTip
                text={itx.action?.from}
                href={`${ROUTER.ADDRESSES.INDEX}/${itx.action?.from}`}
              />
            </TableCell>
            <TableCell>
              <ToolTip
                text={itx.action?.to}
                href={`${ROUTER.ADDRESSES.INDEX}/${itx.action?.to}`}
              />
            </TableCell>
            <TableCell>{parseDate(itx.timestamp).timeAgo}</TableCell>
          </TableRow>
        ))
      }
    </Table>
  );
}

export default InternalTxsTable;
