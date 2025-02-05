import { ROUTER } from '@/common/constants';
import { ReturIcon, TxIcon } from '@/common/icons';
import { IInternalTxs } from '@/common/interfaces/Txs';
import { parseDecimals } from '@/common/utils/ParseDecimals';
import Code from '@/components/ui/Code';
import ListContent from '@/components/generals/ListContent';
import ListItem from '@/components/generals/ListItem';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Date from '@/components/ui/Date';
import Status from '@/components/ui/Status';
import ToolTip from '@/components/ui/ToolTip';
import Link from 'next/link';
import { fetchData } from '@/services/api';

type props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function page({ params }: props) {
  const txParam = (await params).id;
  const response = await fetchData<IInternalTxs>(
    `${ROUTER.ITXS.INDEX}/${txParam}`
  );
  const itx = response?.data;
  return (
    <Card pd="p0" className="mt-6">
      <Link
        href={ROUTER.TXS.INDEX}
        className={`flex items-center gap-2 cursor-pointer mb-6 text-sm text-brand-orange`}
      >
        <ReturIcon className="fill-brand-orange" />
        All Transactions
      </Link>
      <h1 className="flex gap-3 items-center text-3xl font-medium">
        <TxIcon className="w-6 h-6" /> Internal Transaction
      </h1>
      <div className="text-white-400 mt-6">
        Internal Transaction ID{' '}
        <span className="text-brand-purple">
          <ToolTip text={itx?.internalTxId} trim={0} />
        </span>
      </div>

      <Button label="Overview" className="bg-btn-secondary text-white mt-6" />

      <ListContent className="mt-6">
        <ListItem
          title="Transaction"
          value={itx?.transactionHash}
          type="tooltip"
          className="text-brand-purple"
        />
        <ListItem
          title="Block Hash"
          value={itx?.blockHash}
          type="tooltip"
          className="text-brand-purple"
        />
        <ListItem title="Timestamp" value={<Date date={itx?.timestamp} />} />
        <ListItem
          title="Block Number"
          value={parseDecimals(itx?.blockNumber)}
        />

        <hr className="border-gray-700 border-[1px] my-2" />
        <ListItem
          title="From"
          value={itx?.action.from}
          type="tooltip"
          className="text-brand-purple"
        />
        <ListItem
          title="To"
          value={itx?.action.to}
          type="tooltip"
          className="text-brand-purple"
        />
        <hr className="border-gray-700 border-[1px] my-2" />

        <ListItem
          title="Type"
          value={<Badge text={itx!.type!} type="info" />}
        />
        <ListItem title="Input" value={<Code code={itx?.action.input} />} />
        <ListItem title="Value" value={`${itx?.action.value} RBTC`} />
        <ListItem title="Status" value={<Status value={!itx?.error} />} />
        {/* value={itx?.error ? 'Failed' : 'Success'} */}

        <ListItem title="Gas" value={parseDecimals(itx?.action.gas)} />
        <ListItem
          title="Gas Used"
          value={parseDecimals(itx?.result?.gasUsed)}
        />
        <ListItem title="Output" value={<Code code={itx?.result?.output} />} />
        <ListItem title="Error" value={itx?.error} />
      </ListContent>
    </Card>
  );
}
