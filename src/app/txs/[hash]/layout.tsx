import { ROUTER } from '@/common/constants';
import { ReturIcon } from '@/common/icons';
import Card from '@/components/ui/Card';
import Link from 'next/link';
import { TxsDataContextProvider } from '@/context/TxsContext';
import { fetchTxsByHash } from '@/services/transactions';
import PageTitle from '@/components/ui/PageTitle';

type props = {
  params: Promise<{
    hash: string;
  }>;
  children: React.ReactNode;
};

export default async function layout({ children, params }: props) {
  const txParam = (await params).hash;
  const response = await fetchTxsByHash(txParam);
  const tx = response?.data;

  return (
    <Card pd="p0" className="mb-14 mt-6">
      <Link
        href={ROUTER.TXS.INDEX}
        className={`flex items-center gap-2 cursor-pointer mb-6 text-sm text-brand-purple`}
      >
        <ReturIcon className="stroke-brand-purple" />
        All transactions
      </Link>
      <PageTitle title="Transaction Details" />
      <TxsDataContextProvider tx={tx}>{children}</TxsDataContextProvider>
    </Card>
  );
}
