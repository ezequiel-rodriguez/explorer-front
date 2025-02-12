import BlocksTable from '../../components/blocks/BlocksTable';
import PaginationCursor from '@/components/ui/PaginationCursor';
import { IPageProps } from '@/common/interfaces/RouterParams';
import { BlockIcon } from '@/common/icons';
import { fetchBlocks } from '@/services/blocks';

export default async function page(props: IPageProps) {
  const params = await props.searchParams;
  const response = await fetchBlocks(params);

  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl flex gap-3 items-center mt-10">
        <BlockIcon className="w-6 h-6" />
        Blocks
      </h1>

      <div className="mt-8">
        <PaginationCursor
          data={
            response?.paginationData || {
              nextCursor: response?.paginationData?.nextCursor ?? null,
              prevCursor: response?.paginationData?.prevCursor ?? null,
              take: response?.paginationData?.take ?? 50,
            }
          }
        />
      </div>
      <BlocksTable blocks={response?.data} />
    </div>
  );
}
