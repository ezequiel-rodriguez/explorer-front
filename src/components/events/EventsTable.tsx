import { IEvents } from '@/common/interfaces/IEvents';
import React from 'react';
import ToolTip from '../ui/ToolTip';
import { parseDate } from '@/common/utils/Time';
import { Table, TableCell, TableHeader, TableRow } from '../ui/Table';
import { isAddress } from '@rsksmart/rsk-utils';
import { weiToEther } from '@/common/utils/ParseToNumber';
import Block from '../blocks/Block';

type props = {
  events: IEvents[] | undefined;
};
function EventsTable({ events }: props) {
  return (
    <Table>
      <TableHeader>
        <TableCell className="!text-left">Event</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Arguments</TableCell>
        <TableCell>Age</TableCell>
        <TableCell>Block</TableCell>
      </TableHeader>
      {events?.map((e, i) => (
        <TableRow key={i}>
          <TableCell className="text-brand-pink !text-left">
            {e.event || 'N/A'}
          </TableCell>
          <TableCell>
            <ToolTip text={e.address} type="address" />
          </TableCell>
          <TableCell className="flex-col">
            {e.args?.map((a, i) => (
              <div key={i} className="flex flex-col justify-center">
                {isAddress(a.value) ? (
                  <div className="flex">
                    <span>{a.name}:</span>
                    <ToolTip text={a.value} type="address" />
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <span className="flex">{a.name}:</span>
                    <span className="flex">{weiToEther(a.value)}</span>
                  </div>
                )}
              </div>
            ))}
          </TableCell>
          <TableCell>{parseDate(e.timestamp).timeAgo}</TableCell>
          <TableCell>
            <Block number={e.blockNumber} />
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export default EventsTable;
