import AddressesTable from '@/components/addresses/AddressesTable';
import { IPageProps } from '@/common/interfaces/RouterParams';
import { fetchAddresses } from '@/services/addresses';
import PaginationCursor from '@/components/ui/PaginationCursor';
import PageTitle from '@/components/ui/PageTitle';

export default async function Page(props: IPageProps) {
  const params = await props.searchParams;
  const response = await fetchAddresses(params);
  return (
    <div className="w-full">
      <PageTitle title="Addresses" />
      <div className="mt-8">
        <PaginationCursor
          data={
            response?.paginationData || {
              nextCursor: response?.paginationData?.nextCursor ?? null,
              prevCursor: response?.paginationData?.prevCursor ?? null,
              take: response?.paginationData?.take ?? 10,
            }
          }
          pureData={response?.data}
          dataIndicator="addresses"
        />
      </div>
      <AddressesTable addresses={response?.data} />
    </div>
  );
}
