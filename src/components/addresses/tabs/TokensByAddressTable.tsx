import { ITokensByAddress } from '@/common/interfaces/Tokens';
import ToolTip from '@/components/ui/ToolTip';
import React from 'react';
import { Table, TableCell, TableHeader, TableRow } from '@/components/ui/Table';
import { parseDecimals } from '@/common/utils/ParseDecimals';

type props = {
  tokensByAddress: ITokensByAddress[] | undefined;
};

function TokensByAddressTable({ tokensByAddress }: props) {
  return (
    <Table>
      <TableHeader>
        <TableCell>Name</TableCell>
        <TableCell>Address</TableCell>
        <TableCell>Balance</TableCell>
        <TableCell>Symbol</TableCell>
        <TableCell>Updated at block</TableCell>
      </TableHeader>
      {tokensByAddress?.map((tk, i) => (
        <TableRow key={i}>
          <TableCell>{tk.name}</TableCell>
          <TableCell>
            <ToolTip text={tk.contract} type="address" />
          </TableCell>
          <TableCell>{`${tk.balance}`}</TableCell>
          <TableCell>{tk.symbol}</TableCell>
          <TableCell>{parseDecimals(tk.blockNumber)}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export default TokensByAddressTable;
