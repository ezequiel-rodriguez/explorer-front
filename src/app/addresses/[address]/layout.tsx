import { ROUTER } from '@/common/constants';
import { ReturIcon } from '@/common/icons';
import Card from '@/components/ui/Card';
import { fetchAddress } from '@/services/addresses';
import Link from 'next/link';
import ToolTip from '@/components/ui/ToolTip';
import { AddressDataProvider } from '@/context/AddressContext';

type props = {
  params: Promise<{
    address: string;
  }>;
  children: React.ReactNode;
};

export default async function layout({ children, params }: props) {
  const addressParam = (await params).address;
  const response = await fetchAddress(addressParam);
  const address = response?.data;

  return (
    <Card pd="p0" className="mb-14 mt-6">
      <Link
        href={ROUTER.BLOCKS.INDEX}
        className={`flex items-center gap-2 cursor-pointer mb-6 text-sm text-brand-orange`}
      >
        <ReturIcon className="fill-brand-orange" />
        All Blocks
      </Link>
      <h1 className="flex gap-3 items-center text-3xl font-medium">
        {address?.type === 'contract' ? 'Contrat ' : 'Address '}
        Details
      </h1>
      <div className="text-white-400 mt-6">
        Addess
        <span className="text-brand-green ml-1">
          <ToolTip text={address?.address} trim={0} />
        </span>
      </div>
      <AddressDataProvider address={address}>{children}</AddressDataProvider>
    </Card>
  );
}
