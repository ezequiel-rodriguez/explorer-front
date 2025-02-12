'use client';
import { IBlocks } from '@/common/interfaces/Blocks';
import ToolTip from '../ui/ToolTip';
import { Table, TableCell, TableHeader, TableRow } from '../ui/Table';
import Block from './Block';
import { useState, useMemo } from 'react';
import Date from '../ui/Date';

type props = {
  blocks: IBlocks[] | undefined;
};

function BlocksTable({ blocks }: props) {
  const [highlightedMiner, setHighlightedMiner] = useState<string | null>(null);

  const minerCount = useMemo(() => {
    const count: Record<string, number> = {};
    blocks?.forEach((block) => {
      count[block.miner] = (count[block.miner] || 0) + 1;
    });
    return count;
  }, [blocks]);

  return (
    <Table>
      <TableHeader>
        <TableCell>Block</TableCell>
        <TableCell>Timestamp</TableCell>
        <TableCell>Txs</TableCell>
        <TableCell>Hash</TableCell>
        <TableCell>Miner</TableCell>
        <TableCell>Size</TableCell>
      </TableHeader>
      {blocks?.map((b, i) => {
        const isMinerRepeated = minerCount[b.miner] > 1;

        return (
          <TableRow key={i}>
            <TableCell className="text-brand-green">
              <Block number={b.number} />
            </TableCell>
            <TableCell>
              <Date date={b.timestamp} mode="timer" />
            </TableCell>
            <TableCell>{b.transactions}</TableCell>
            <TableCell>
              <ToolTip text={b.hash} type="block" />
            </TableCell>
            <TableCell
              onMouseEnter={() =>
                isMinerRepeated && setHighlightedMiner(b.miner)
              }
              onMouseLeave={() => setHighlightedMiner(null)}
            >
              <ToolTip
                text={b.miner}
                type="address"
                group={highlightedMiner === b.miner && isMinerRepeated}
              />
            </TableCell>
            <TableCell>{b.size}</TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
}

export default BlocksTable;
