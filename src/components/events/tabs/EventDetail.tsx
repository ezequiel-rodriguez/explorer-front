import React from 'react';
import ListContent from '@/components/generals/ListContent';
import ListItem from '@/components/generals/ListItem';
import Date from '@/components/ui/Date';
import Block from '@/components/blocks/Block';
import { parseDecimals } from '@/common/utils/ParseDecimals';
import { ArrowLargeIcon } from '@/common/icons';
import ToolTip from '@/components/ui/ToolTip';
import { useEventDataContext } from '@/context/EventContext';

function EventDetail() {
  const { event } = useEventDataContext();
  return (
    <ListContent className="mt-6">
      <ListItem title="Event Name:" value={event?.event} />
      <ListItem title="Timestamp:" value={<Date date={event?.timestamp} />} />
      <ListItem
        title="Transaction Hash:"
        value={event?.transactionHash}
        type="tooltip"
        className="text-brand-purple"
      />
      <ListItem
        title="Block Number:"
        className="!text-brand-purple"
        value={<Block number={event?.blockNumber} />}
      />
      <hr className="border-gray-700 border-[1px] my-2" />
      <ListItem
        title="From:"
        type="tooltip"
        value={event?.transaction?.from}
        className="text-brand-purple"
      />
      <ListItem
        title="To:"
        type="tooltip"
        value={event?.transaction?.to}
        className="text-brand-purple"
      />
      <hr className="border-gray-700 border-[1px] my-2" />
      <ListItem
        title="Value:"
        value={`${parseDecimals(event?.transaction.value, 6)} ${event?.contract_detail.symbol}`}
      />
      <ListItem
        title="Contract:"
        value={
          <div className="flex items-center gap-1 text-brand-purple">
            ${event?.contract_detail.name}
            <ArrowLargeIcon />
            <ToolTip text={event?.address} type="address" className="!p-0" />
          </div>
        }
      />
    </ListContent>
  );
}

export default EventDetail;
