'use client';
import { ITokens } from '@/common/interfaces/Tokens';
import ToolTip from '@/components/ui/ToolTip';
import React from 'react';
import { Table, TableCell, TableHeader, TableRow } from '../ui/Table';
import Link from 'next/link';
import { ROUTER } from '@/common/constants';
import Block from '../blocks/Block';
import { getRouteStyles } from '@/common/utils/RouteColors';
import { usePathname } from 'next/navigation';
import { parseDecimals } from '@/common/utils/ParseDecimals';

type props = {
  tokens: ITokens[] | undefined;
};

function TokensTable({ tokens }: props) {
  const pathname = usePathname();
  const textColor = getRouteStyles(pathname, ['text']);
  return (
    <Table>
      <TableHeader>
        <TableCell>Name</TableCell>
        <TableCell>Symbol</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Balance</TableCell>
        <TableCell>Updated at block</TableCell>
      </TableHeader>
      {tokens?.map((tk, i) => (
        <TableRow key={i}>
          <TableCell>
            <Link
              href={`${ROUTER.ADDRESSES.INDEX}/${tk.address}`}
              className={`${textColor}`}
            >
              {tk.name || `(Not Provided)`}
            </Link>
          </TableCell>
          <TableCell>{tk.symbol || `(Not Provided)`}</TableCell>
          <TableCell>
            <ToolTip text={tk.address} type="address" />
          </TableCell>
          <TableCell>{parseDecimals(tk.balance, 4)}</TableCell>
          <TableCell className={`${textColor}`}>
            <Block number={tk.blockNumber} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export default TokensTable;
