import React from 'react';
import { Table, TableCell, TableHeader, TableRow } from '../ui/Table';
import ToolTip from '../ui/ToolTip';
import { IEvents } from '@/common/interfaces/IEvents';
import { parseDecimals } from '@/common/utils/ParseDecimals';
import { InternalLinkIcon } from '@/common/icons';
import Link from 'next/link';
import { ROUTER } from '@/common/constants';
import { getRouteStyles } from '@/common/utils/RouteColors';
import { usePathname } from 'next/navigation';

type props = {
  tokens: IEvents[] | undefined;
};

function TokenTransfersTable({ tokens }: props) {
  const pathname = usePathname();
  const iconColor = getRouteStyles(pathname, ['stroke']);
  return (
    <Table>
      <TableHeader>
        <TableCell className="w-10 flex-none"></TableCell>
        <TableCell>Token</TableCell>
        <TableCell>Token Type</TableCell>
        <TableCell>From</TableCell>
        <TableCell>To</TableCell>
        <TableCell>Amount</TableCell>
      </TableHeader>
      {tokens?.map((tk, i) => (
        <TableRow key={i}>
          <TableCell className="w-10 flex-none">
            <Link href={`${ROUTER.EVENTS.INDEX}/${tk.eventId}`}>
              <InternalLinkIcon className={iconColor} />
            </Link>
          </TableCell>
          <TableCell>{tk?.contrant_detail?.name}</TableCell>
          <TableCell className="flex flex-1 flex-col">
            {tk?.contract_interface?.map((ci, i) => <div key={i}>{ci}</div>)}
          </TableCell>
          <TableCell>
            <ToolTip text={tk.topic1!} type="address" />
          </TableCell>
          <TableCell>
            <ToolTip text={tk.topic2!} type="address" />
          </TableCell>
          <TableCell>{parseDecimals(tk.totalSupply, 4)}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export default TokenTransfersTable;
