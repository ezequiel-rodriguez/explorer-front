'use client';
import { ITxs } from '@/common/interfaces/Txs';
import { parseDecimals } from '@/common/utils/ParseDecimals';
import ToolTip from '@/components/ui/ToolTip';
import React, { useMemo, useState } from 'react';
import { Table, TableCell, TableHeader, TableRow } from '../ui/Table';
import Status from '../ui/Status';
import Block from '../blocks/Block';
import Date from '../ui/Date';

type props = {
  txs: ITxs[] | undefined;
  showBlock?: boolean;
};

function TxsTable({ txs, showBlock = true }: props) {
  const [highlightedAddress, setHighlightedAddress] = useState<string | null>(
    null,
  );

  const addressCount = useMemo(() => {
    const count: Record<string, number> = {};
    txs?.forEach((tx) => {
      count[tx.from] = (count[tx.from] || 0) + 1;
      count[tx.to] = (count[tx.to] || 0) + 1;
    });
    return count;
  }, [txs]);

  return (
    <Table>
      <TableHeader>
        <TableCell>Hash</TableCell>
        <TableCell>Status</TableCell>
        {showBlock && <TableCell>Block</TableCell>}
        <TableCell>Ago</TableCell>
        <TableCell>From</TableCell>
        <TableCell>To</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Fee</TableCell>
      </TableHeader>
      {txs?.map((tx, i) => {
        const isFromRepeated = addressCount[tx.from] > 1;
        const isToRepeated = addressCount[tx.to] > 1;

        return (
          <TableRow key={i}>
            <TableCell>
              <ToolTip text={tx.hash} type="hash" />
            </TableCell>
            <TableCell>
              <Status type={tx.status} />
            </TableCell>
            {showBlock && (
              <TableCell>
                <Block number={tx.blockNumber} />
              </TableCell>
            )}
            <TableCell>
              <Date date={tx.timestamp} mode="timer" />
            </TableCell>
            <TableCell
              onMouseEnter={() =>
                isFromRepeated && setHighlightedAddress(tx.from)
              }
              onMouseLeave={() => setHighlightedAddress(null)}
            >
              <ToolTip
                text={tx.from}
                type="address"
                group={highlightedAddress === tx.from && isFromRepeated}
              />
            </TableCell>
            <TableCell
              onMouseEnter={() => isToRepeated && setHighlightedAddress(tx.to)}
              onMouseLeave={() => setHighlightedAddress(null)}
            >
              <ToolTip
                text={tx.to}
                type="address"
                group={highlightedAddress === tx.to && isToRepeated}
              />
            </TableCell>
            <TableCell className="break-all">{`${parseDecimals(tx.value, 6)} RBTC`}</TableCell>
            <TableCell>{parseDecimals(tx.gasUsed)}</TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
}

export default TxsTable;
