import { ROUTER } from '@/common/constants';
import { ReturIcon } from '@/common/icons';
import Card from '@/components/ui/Card';
import ToolTip from '@/components/ui/ToolTip';
import { BlocksDataProvider } from '@/context/BlocksContext';
import { fetchOneBlock } from '@/services/blocks';
import Link from 'next/link';

type props = {
  params: Promise<{
    id: number;
  }>;
  children: React.ReactNode;
};
export default async function layout({ children, params }: props) {
  const { id } = await params;
  const response = await fetchOneBlock(id);
  const block = response?.data;

  return (
    <Card pd="p0" className="mb-14 mt-6">
      <Link
        href={ROUTER.BLOCKS.INDEX}
        className={`flex items-center gap-1 cursor-pointer mb-6 text-sm text-brand-green`}
      >
        <ReturIcon className="stroke-brand-green" />
        All Blocks
      </Link>
      <h1 className="flex gap-3 items-center text-3xl font-medium">
        Block <span className="text-white-400">#{block?.number}</span>
      </h1>
      <div className="text-white-400 mt-6">
        Mined by
        <span className="text-brand-green ml-1">
          <ToolTip text={block?.miner} trim={0} type="address" />
        </span>
      </div>
      <BlocksDataProvider block={block} navigation={response?.navigation}>
        {children}
      </BlocksDataProvider>
    </Card>
  );
}
