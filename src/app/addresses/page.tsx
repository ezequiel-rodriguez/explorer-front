import Pagination from '@/components/ui/Pagination';
import AddressesTable from '@/components/addresses/AddressesTable';
import { IPageProps } from '@/common/interfaces/RouterParams';
import { AddressIcon } from '@/common/icons';
import { fetchAddresses } from '@/services/addresses';

export default async function Page(props: IPageProps) {
  const params = await props.searchParams;
  const response = await fetchAddresses(params);
  return (
    <div className='w-full'>
      <h1 className="font-bold text-3xl flex gap-3 items-center mt-10">
        <AddressIcon className='w-6 h-6' />
        Addresses
      </h1>
      <Pagination
        text='Total Addresses'
        data={response!.pagination!}
      />
      <AddressesTable
        addresses={response?.data}
      />
    </div>
  );
}
