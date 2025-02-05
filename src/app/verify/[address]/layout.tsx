import Card from '@/components/ui/Card';
import { fetchAddress } from '@/services/addresses';
import SectionHeader from '@/components/ui/SectionHeader';
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
    <Card pd="p0">
      {address && (
        <SectionHeader
          address={address?.address}
          title={'Verify Contract'}
          colorClassAddress="text-white"
        />
      )}
      <AddressDataProvider address={address}>{children}</AddressDataProvider>
    </Card>
  );
}
