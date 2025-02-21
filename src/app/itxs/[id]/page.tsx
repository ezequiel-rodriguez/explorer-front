import { ROUTER } from '@/common/constants';
import { ReturIcon } from '@/common/icons';
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
import PageTitle from '@/components/ui/PageTitle';
import Block from '@/components/blocks/Block';

type props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function page({ params }: props) {
  const txParam = (await params).id;
  const response = await fetchData<IInternalTxs>(
    `${ROUTER.ITXS.INDEX}/${txParam}`,
  );
  const itx = response?.data;
  console.log('itx: ', itx)
  return (
    <Card pd="p0" className="mt-6">
      <Link
        href={ROUTER.TXS.INDEX}
        className={`flex items-center gap-2 cursor-pointer mb-6 text-sm text-brand-purple`}
      >
        <ReturIcon className="stroke-brand-purple" />
        All Transactions
      </Link>
      <PageTitle title="Internal Transaction" />
      <div className="text-white-400 mt-6 text-lg">
        Internal Transaction Id
        <span className="text-brand-purple">
          <ToolTip
            text={itx?.internalTxId}
            trim={0}
            className="!text-white-100"
          />
        </span>
      </div>

      <Button label="Overview" className="bg-btn-secondary text-white mt-6" />

      <ListContent className="mt-6">
        <ListItem
          title="Transaction:"
          value={itx?.transactionHash}
          type="tooltip"
          className="text-brand-purple"
        />
        <ListItem
          title="Block Hash:"
          value={itx?.blockHash}
          type="tooltip"
          className="text-brand-purple"
        />
        <ListItem title="Timestamp:" value={<Date date={itx?.timestamp} />} />
        <ListItem
          title="Block Number:"
          value={<Block number={itx?.blockNumber} />}
        />

        <hr className="border-gray-700 border-[1px] my-2" />
        <ListItem
          title="From:"
          value={itx?.action.from}
          type="tooltip"
          className="text-brand-purple"
        />
        <ListItem
          title="To:"
          value={itx?.action.to}
          type="tooltip"
          className="text-brand-purple"
        />
        <hr className="border-gray-700 border-[1px] my-2" />

        <ListItem
          title="Type:"
          value={<Badge text={itx!.type!} type="info" />}
        />
        <ListItem title="Input" value={<Code code={itx?.action.input || ' '} />} />
        <ListItem
          title="Value:"
          value={`${parseDecimals(itx?.action.value, 6)} RBTC`}
        />
        <ListItem
          title="Status:"
          value={<Status type={!itx?.error ? 'SUCCESS' : 'FAIL'} />}
        />
        <ListItem title="Gas" value={parseDecimals(itx?.action.gas)} />
        <ListItem
          title="Gas Used:"
          value={parseDecimals(itx?.result?.gasUsed)}
        />
        {
          itx?.action.init && (
            <ListItem title="Init:" value={<Code code={itx?.action.init} />} />
          )
        }
        {
          itx?.result?.code && (
            <ListItem title="Code:" value={<Code code={itx?.result?.code} />} />
          )
        }
        <ListItem title="Output:" value={<Code code={itx?.result?.output || ' '} />} />
        <ListItem title="Error:" value={itx?.error} />
      </ListContent>
    </Card>
  );
}
