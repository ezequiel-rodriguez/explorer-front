import TxsTable from '@/components/txs/TxsTable';
import { IPageProps } from '@/common/interfaces/RouterParams';
import { fetchTxs } from '@/services/transactions';
import PageTitle from '@/components/ui/PageTitle';
import PaginationCursor from '@/components/ui/PaginationCursor';

export default async function page(props: IPageProps) {
  const params = await props.searchParams;
  const response = await fetchTxs(params);
  return (
    <div className="w-full">
      <PageTitle title="Transactions" />
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
          dataIndicator="txs"
        />
      </div>
      <TxsTable txs={response?.data} />
    </div>
  );
}
