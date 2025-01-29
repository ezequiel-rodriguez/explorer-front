import { IEvents } from '@/common/interfaces/IEvents'
import React from 'react'
import ToolTip from '../ui/ToolTip'
import { ROUTER } from '@/common/constants'
import { parseDecimals } from '@/common/utils/ParseDecimals'
import Link from 'next/link'
import { parseDate } from '@/common/utils/Time'
import { Table, TableCell, TableHeader, TableRow } from '../ui/Table'
import { isAddress } from '@rsksmart/rsk-utils'
import { weiToEther } from '@/common/utils/ParseToNumber'

type props = {
  events: IEvents[] | undefined
}
function EventsTable({ events }: props) {
  return (
    <Table>
      <TableHeader>
        <TableCell className='!text-left'>Event</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Arguments</TableCell>
        <TableCell>Timestamp</TableCell>
        <TableCell>Block</TableCell>
      </TableHeader>
        {
          events?.map((e, i) => (
            <TableRow key={i} >
              <TableCell className='text-brand-pink !text-left'>
                {e.event || 'N/A' }
              </TableCell>
              <TableCell>
                <ToolTip text={e.address} href={`${ROUTER.ADDRESSES.INDEX}/${e.address}`} />
              </TableCell>
              <TableCell>
                {
                  e.args?.map((a, i) => (
                    <div key={i} className='flex justify-center'>
                      { 
                        isAddress(a) ?
                        (<ToolTip text={a} />)
                        :
                        <span className='flex'>value: {weiToEther(a)}</span>
                      }
                    </div>
                  ))
                }
              </TableCell>
              <TableCell>
                {parseDate(e.timestamp).timeAgo}
              </TableCell>
              <TableCell>
                <Link href={`${ROUTER.BLOCKS.INDEX}/${e.blockNumber}`}>
                  {parseDecimals(e.blockNumber)}
                </Link>
              </TableCell>
            </TableRow>
          ))
        }
    </Table>
  )
}

export default EventsTable
