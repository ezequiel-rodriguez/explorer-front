import Pagination from '@/components/ui/Pagination';
import TxsTable from '@/components/txs/TxsTable';
import { IPageProps } from '@/common/interfaces/RouterParams';
import { TxIcon } from '@/common/icons';
import { fetchTxs } from '@/services/transactions';

export default async function page(props: IPageProps) {
  const params = await props.searchParams;
  const response = await fetchTxs(params);
  return (
    <div className="w-full">
      <h1 className="font-bold text-3xl flex gap-3 items-center mt-10">
        <TxIcon className="w-6 h-6" />
        Transactions
      </h1>
      <Pagination text="Total Transactions: " data={response!.pagination!} />
      <TxsTable txs={response?.data} />
    </div>
  );
}
