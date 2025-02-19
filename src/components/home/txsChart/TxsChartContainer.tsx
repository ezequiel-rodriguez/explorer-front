'use client';
import React from 'react';
import TxsChart from './TxsChart';
import { useHomeDataContext } from '@/context/HomeContext';

export default function TxsChartContainer() {
  const { blocks } = useHomeDataContext();
  if (!blocks) return '';

  // Sort blocks by number in ascending order
  const ascBlocks = blocks.sort((a, b) => a.number - b.number);

  return (
    <div className="w-full md:w-1/2" key={ascBlocks[0].number}>
      <TxsChart blocks={ascBlocks} />
    </div>
  );
}
