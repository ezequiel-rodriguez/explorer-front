'use client';
import Link from 'next/link';
import { ROUTER } from '@/common/constants';
import { RightArrowIcon } from '@/common/icons';
import BlockCard from './BlockCard';
import { useHomeDataContext } from '@/context/HomeContext';
import { ChangeEvent } from 'react';
import CardLoader from '@/components/loaders/CardLoader';
import Card from '@/components/ui/Card';

export default function BlockContainer() {
  const { blocks, autoUpdate, setAutoUpdate } = useHomeDataContext();
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setAutoUpdate(value);
    localStorage.setItem('autoupdate', value ? 'active' : 'inactive');
  };
  if (!blocks) return <CardLoader />;
  const sortedBlocks = blocks.sort((a, b) => b.number - a.number);

  return (
    <Card className="w-full bg-secondary" pd="p3">
      <div className="flex justify-between">
        <div className="text-left text-2xl font-semibold mb-2 pl-6">Blocks</div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={autoUpdate}
            className="w-fit bg-primary"
            onChange={handleCheck}
          />
          <span>autoupdate</span>
        </div>
      </div>
      {sortedBlocks?.slice(0, 6)
        .map((block, i) => <BlockCard key={i} block={block} />)}
      <div className="mt-3 w-full text-center">
        <Link
          href={ROUTER.BLOCKS.INDEX}
          className="hover:underline flex justify-center items-center gap-2"
        >
          See all blocks
          <RightArrowIcon />
        </Link>
      </div>
    </Card>
  );
}
