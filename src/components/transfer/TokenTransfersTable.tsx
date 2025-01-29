import React from 'react'
import { Table, TableCell, TableHeader, TableRow } from '../ui/Table'
import ToolTip from '../ui/ToolTip'
import { IEvents } from '@/common/interfaces/IEvents'
import Badge from '../ui/Badge'
import { parseDecimals } from '@/common/utils/ParseDecimals'

type props = {
  tokens: IEvents[] | undefined
}

function TokenTransfersTable({ tokens }: props) {
  return (
    <Table>
      <TableHeader>
        <TableCell>Event</TableCell>
        <TableCell>ID</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Symbol</TableCell>
        <TableCell>From</TableCell>
        <TableCell>To</TableCell>
        <TableCell>Amount</TableCell>
      </TableHeader>
      {
        tokens?.map((tk, i) => (
          <TableRow key={i}>
            <TableCell>
              <Badge text={tk.event!} type='info' />
            </TableCell>
            <TableCell>
              <ToolTip text={tk.eventId} />
            </TableCell>
            <TableCell>{tk?.contrant_detail?.name}</TableCell>
            <TableCell>{tk?.contrant_detail?.symbol}</TableCell>
            <TableCell>
              <ToolTip text={tk.topic1!} />
            </TableCell>
            <TableCell>
              <ToolTip text={tk.topic2!} />
            </TableCell>
            <TableCell>{parseDecimals(tk.totalSupply, 4)}</TableCell>
          </TableRow>
        ))
      }
    </Table>
  )
}

export default TokenTransfersTable
