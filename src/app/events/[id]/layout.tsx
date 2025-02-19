import { ROUTER } from '@/common/constants';
import { ReturIcon } from '@/common/icons';
import Card from '@/components/ui/Card';
import ToolTip from '@/components/ui/ToolTip';
import Link from 'next/link';
import { fetchData } from '@/services/api';
import PageTitle from '@/components/ui/PageTitle';
import { IEvents } from '@/common/interfaces/IEvents';
import { EventDataContextProvider } from '@/context/EventContext';

type props = {
  params: Promise<{
    id: string;
  }>;
  children: React.ReactNode;
};

export default async function page({ params, children }: props) {
  const txParam = (await params).id;
  const response = await fetchData<IEvents>(
    `${ROUTER.EVENTS.INDEX}/${txParam}`,
  );
  const event = response?.data;
  return (
    <Card pd="p0" className="mt-6">
      <Link
        href={ROUTER.TXS.INDEX}
        className={`flex items-center gap-2 cursor-pointer text-sm text-brand-purple`}
      >
        <ReturIcon className="stroke-brand-purple" />
        All Transactions
      </Link>
      <PageTitle title="Event Details" />
      <div className="text-white-400 mt-6 text-lg">
        Event id is
        <span className="text-brand-purple">
          <ToolTip text={event?.eventId} trim={0} className="!text-white-100" />
        </span>
      </div>

      <EventDataContextProvider event={event}>
        {children}
      </EventDataContextProvider>
    </Card>
  );
}
