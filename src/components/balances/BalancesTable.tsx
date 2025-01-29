import React from 'react'
import { Table, TableCell, TableHeader, TableRow } from '../ui/Table'
import { IBalances } from '@/common/interfaces/Balances'
import Date from '../ui/Date'
import { parseDecimals } from '@/common/utils/ParseDecimals'
import { AddressIcon } from '@/common/icons'

type props = {
  balances: IBalances[] | undefined
}
function BalancesTable({ balances }: props) {
  return (
    <Table>
      <TableHeader>
        <TableCell className="w-12 flex-initial" />
        <TableCell>Amount</TableCell>
        <TableCell>Timestamp</TableCell>
        <TableCell>Block</TableCell>
      </TableHeader>
      {
        balances?.map((b, i) => (
          <TableRow key={i}>
            <TableCell className='w-12 flex justify-center flex-initial'>
              <AddressIcon />
            </TableCell>
            <TableCell>
              {`${b.balance} RBTC`}
            </TableCell>
            <TableCell className='flex justify-center'>
              <Date date={b.timestamp} />
            </TableCell>
            <TableCell>{parseDecimals(b.blockNumber)}</TableCell>
          </TableRow>
        ))
      }
    </Table>
  )
}

export default BalancesTable
