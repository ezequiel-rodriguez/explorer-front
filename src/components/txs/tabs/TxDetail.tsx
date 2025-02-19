import { parseDecimals } from '@/common/utils/ParseDecimals';
import ListContent from '@/components/generals/ListContent';
import ListItem from '@/components/generals/ListItem';
import { useTxsDataContext } from '@/context/TxsContext';
import Date from '@/components/ui/Date';
import Status from '@/components/ui/Status';
import Badge from '@/components/ui/Badge';
import Code from '@/components/ui/Code';
import Block from '@/components/blocks/Block';
import { txFee } from '@/common/utils/ParseTx';
import ToolTip from '@/components/ui/ToolTip';

function TxDetail() {
  const { tx } = useTxsDataContext();

  return (
    <ListContent>
      <ListItem
        title="Transaction Hash:"
        value={
          <ToolTip text={tx?.hash} className="!text-white-100 px-0" trim={0} />
        }
      />
      <ListItem title="Timestamp:" value={<Date date={tx?.timestamp} />} />
      <ListItem title="Status:" value={<Status type={tx!.status!} />} />
      <ListItem
        title="Block:"
        value={<Block number={tx?.blockNumber} />}
        className="!text-brand-purple"
      />
      <ListItem
        title="Type:"
        value={tx?.txType ? <Badge text={tx!.txType!} type="info" /> : ''}
      />
      <ListItem title="Nonce:" value={tx?.nonce} />
      <hr className="border-gray-700 border-[1px] my-2" />
      <ListItem
        title="From:"
        type="tooltip"
        value={tx?.from}
        className="text-brand-purple"
      />
      <ListItem
        title="To:"
        type="tooltip"
        value={tx?.to}
        className="text-brand-purple"
      />
      <hr className="border-gray-700 border-[1px] my-2" />

      <ListItem title="Value:" value={`${tx?.value} RBTC`} />
      <ListItem
        title="Transactions Fee:"
        value={`${txFee(tx?.gasPrice, tx?.gasUsed)} RBTC`}
      />
      <ListItem title="Gas Price:" value={tx?.gasPrice} />
      <ListItem title="Gas Used:" value={parseDecimals(tx?.gasUsed)} />
      <ListItem title="Input:" value={<Code code={tx?.input} />} />
    </ListContent>
  );
}

export default TxDetail;
