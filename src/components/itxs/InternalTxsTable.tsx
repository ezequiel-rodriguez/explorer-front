import { ROUTER } from '@/common/constants';
import { TxIcon } from '@/common/icons';
import { IInternalTxs } from '@/common/interfaces/Txs';
import { parseDate } from '@/common/utils/Time';
import ToolTip from '@/components/control/ToolTip';
import React from 'react';

type props = {
  itxs: IInternalTxs[] | undefined
}

function InternalTxsTable({ itxs }: props) {
  return (
    <div className='w-full mt-6'>
      <div className='w-full bg-secondary rounded-tl-xl rounded-tr-xl flex h-13 p-5'>
        <div className='w-12 text-center'></div>
        <div className='flex-1 text-center'>From</div>
        <div className='flex-1 text-center'>To</div>
        <div className='flex-1 text-center'>Type</div>
        <div className='flex-1 text-center'>Timestamp</div>
        <div className='flex-1 text-center'>Value</div>
      </div>
            {
              itxs?.map((itx, i) => (
                <div key={i} className='flex h-13 p-5 hover:bg-secondary text-white-400'>
                  <div className='w-12 text-center'>
                    <TxIcon />
                  </div>
                  <div className='flex-1 text-center text-brand-orange'>
                    <ToolTip
                      text={itx.from}
                      href={`${ROUTER.ADDRESSES}/${itx.from}`}
                    />
                  </div>
                  <div className='flex-1 text-center'>
                    <ToolTip
                      text={itx.to}
                      href={`${ROUTER.ADDRESSES}/${itx.to}`}
                    />
                  </div>
                  <div className='flex-1 text-center'>
                    { itx.type }
                  </div>
                  <div className='flex-1 text-center'>
                    { parseDate(itx.timestamp).timeAgo }
                  </div>
                  <div className='flex-1 text-center'>
                    { itx.value }
                  </div>
                </div>
              ))
            }
        {
          itxs?.length === 0 && (
            <div className='w-full flex justify-center mt-10'>
              <span className='text-6xl italic text-gray-700'>No Txs</span>
            </div>
          )
        }
    </div>
  )
}

export default InternalTxsTable
