'use client';
import { IInternalTxs } from '@/common/interfaces/Txs';
import ToolTip from '@/components/ui/ToolTip';
import React, { useMemo, useState } from 'react';
import { Table, TableCell, TableHeader, TableRow } from '../ui/Table';
import Status from '../ui/Status';
import Badge from '../ui/Badge';
import { parseDecimals } from '@/common/utils/ParseDecimals';
import Link from 'next/link';
import { InternalLinkIcon } from '@/common/icons';
import { ROUTER } from '@/common/constants';
import { usePathname } from 'next/navigation';
import { getRouteStyles } from '@/common/utils/RouteColors';
import Block from '../blocks/Block';

type props = {
  itxs: IInternalTxs[] | undefined;
  showBlock?: boolean;
};

function InternalTxsTable({ itxs, showBlock = true }: props) {
  const pathname = usePathname();
  const color = getRouteStyles(pathname, ['stroke', 'text']);

  const [highlightedAddress, setHighlightedAddress] = useState<string | null>(
    null,
  );
  const addressCount = useMemo(() => {
    const count: Record<string, number> = {};
    itxs?.forEach((tx) => {
      count[tx.action.from] = (count[tx.action.from] || 0) + 1;
      count[tx.action.to] = (count[tx.action.to] || 0) + 1;
    });
    return count;
  }, [itxs]);
  return (
    <Table>
      <TableHeader>
        <TableCell type="icon" />
        <TableCell>Type</TableCell>
        <TableCell>Status</TableCell>
        {showBlock && <TableCell>Block</TableCell>}
        <TableCell>From</TableCell>
        <TableCell>To</TableCell>
        <TableCell>Amount RBTC</TableCell>
        <TableCell>Fee</TableCell>
      </TableHeader>
      {itxs?.map((itx, i) => {
        const isFromRepeated = addressCount[itx.action.from] > 1;
        const isToRepeated = addressCount[itx.action.to] > 1;
        return (
          <TableRow key={i}>
            <TableCell type="icon">
              <Link href={`${ROUTER.ITXS.INDEX}/${itx.internalTxId}`}>
                <InternalLinkIcon className={`${color}`} />
              </Link>
            </TableCell>
            <TableCell>
              <Badge
                className="capitalize"
                text={itx.action?.callType || itx.type}
                type="info"
              />
            </TableCell>
            <TableCell>
              <Status type={itx.error === null ? 'SUCCESS' : 'FAIL'} />
            </TableCell>
            {showBlock && (
              <TableCell className={`${color}`}>
                <Block number={itx.blockNumber} />
              </TableCell>
            )}
            <TableCell
              onMouseEnter={() =>
                isFromRepeated && setHighlightedAddress(itx.action.from)
              }
              onMouseLeave={() => setHighlightedAddress(null)}
              className="text-brand-orange"
            >
              <ToolTip
                text={itx.action?.from}
                type="address"
                group={highlightedAddress === itx.action.from && isFromRepeated}
              />
            </TableCell>
            <TableCell
              onMouseEnter={() =>
                isToRepeated && setHighlightedAddress(itx.action.to)
              }
              onMouseLeave={() => setHighlightedAddress(null)}
            >
              <ToolTip
                text={itx.action.to}
                type="address"
                group={highlightedAddress === itx.action.to && isToRepeated}
              />
            </TableCell>
            <TableCell>{parseDecimals(itx.action.value, 4)}</TableCell>
            <TableCell>{itx.action.gas}</TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
}

export default InternalTxsTable;
