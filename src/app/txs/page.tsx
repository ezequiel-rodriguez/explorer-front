import Pagination from '@/components/ui/Pagination';
import TxsTable from '@/components/txs/TxsTable';
import { IPageProps } from '@/common/interfaces/RouterParams';
import { fetchTxs } from '@/services/transactions';
import PageTitle from '@/components/ui/PageTitle';

export default async function page(props: IPageProps) {
  const params = await props.searchParams;
  const response = await fetchTxs(params);
  return (
    <div className="w-full">
      <PageTitle title="Transactions" />
      <Pagination data={response!.pagination!} />
      <TxsTable txs={response?.data} />
    </div>
  );
}
