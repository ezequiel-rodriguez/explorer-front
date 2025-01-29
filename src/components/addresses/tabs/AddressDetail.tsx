'use client'
import ListContent from "@/components/generals/ListContent";
import ListItem from "@/components/generals/ListItem";
import Badge from "@/components/ui/Badge";
import Date from "@/components/ui/Date";
import { useAddressDataContext } from "@/context/AddressContext";

function AddressDetail() {
  const { address } = useAddressDataContext();

  return (
    <ListContent>
      {
        address?.type === 'contract' && (
          <>
            <ListItem title="Contract Name:" value={address?.name} />
            <ListItem title="Symbol:" value={address?.symbol} />
            <ListItem title="Timestamp" value={<Date date={address?.createdByTx?.timestamp} />} />
            <ListItem title="Total Supply" value={address?.totalSupply} />
          </>
        )
      }
      <ListItem title="Type" value={<Badge text={address?.type} type="info" />} />
      <ListItem title="Balance" value={`${address?.balance} RBTC`} />
      <ListItem title="Updated at block:" value={address?.blockNumber} />
      <ListItem title="Internal Tx:" value={address?.createdByTx?.internalTxId} />
    </ListContent>
  )
}

export default AddressDetail
