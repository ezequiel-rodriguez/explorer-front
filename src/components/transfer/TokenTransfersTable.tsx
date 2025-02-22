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
  const color = getRouteStyles(pathname, ['stroke', 'text']);
  return (
    <Table>
      <TableHeader>
        <TableCell type="icon" />
        <TableCell>Token</TableCell>
        <TableCell>Token Type</TableCell>
        <TableCell>From</TableCell>
        <TableCell>To</TableCell>
        <TableCell>Amount</TableCell>
      </TableHeader>
      {tokens?.map((tk, i) => (
        <TableRow key={i}>
          <TableCell type="icon">
            <Link href={`${ROUTER.EVENTS.INDEX}/${tk.eventId}`}>
              <InternalLinkIcon className={color} />
            </Link>
          </TableCell>
          <TableCell className={color}>
            <Link href={`${ROUTER.ADDRESSES.INDEX}/${tk.address}`}>
              {tk?.contract_detail?.name || '(Not Provided)'}
            </Link>
          </TableCell>
          <TableCell className="flex flex-1 flex-col">
            {tk?.contract_interface?.map((ci, i) => <div key={i}>{ci}</div>)}
          </TableCell>
          <TableCell>
            <ToolTip text={tk.topic1!} type="address" />
          </TableCell>
          <TableCell>
            <ToolTip text={tk.topic2!} type="address" />
          </TableCell>
          <TableCell>
            <ToolTip
              text={parseDecimals(tk.totalSupply, 4)}
              showCopy={false}
              className="!text-white-100"
            />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export default TokenTransfersTable;
