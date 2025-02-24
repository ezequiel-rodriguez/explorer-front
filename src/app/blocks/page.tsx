import BlocksTable from '../../components/blocks/BlocksTable';
import PaginationCursor from '@/components/ui/PaginationCursor';
import { IPageProps } from '@/common/interfaces/RouterParams';
import { fetchBlocks } from '@/services/blocks';
import PageTitle from '@/components/ui/PageTitle';

export default async function page(props: IPageProps) {
  const params = await props.searchParams;
  const response = await fetchBlocks(params);

  return (
    <div className="w-full">
      <PageTitle title="Blocks" />
      <div className="mt-8">
        <PaginationCursor
          data={
            response?.paginationData || {
              nextCursor: response?.paginationData?.nextCursor ?? null,
              prevCursor: response?.paginationData?.prevCursor ?? null,
              take: response?.paginationData?.take ?? 50,
            }
          }
          pureData={response?.data}
          dataIndicator="blocks"
        />
      </div>
      <BlocksTable blocks={response?.data} />
    </div>
  );
}
