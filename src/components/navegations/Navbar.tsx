'use client';
import { ROUTER } from '@/common/constants';
import { usePathname } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { isAddress } from '@rsksmart/rsk-utils';
import { isHexString, add0x } from '@rsksmart/rsk-utils';
import { fetchOneBlock } from '@/services/blocks';
import { IBlocks } from '@/common/interfaces/Blocks';

export const isValidBlockNumber = (value: string | number, lastBlock: number) => {
  let newValue = value;
  if (value.toString().includes(',')) newValue = value.toString().replaceAll(',', '');
  const number = Number(newValue);
  // optional checks lastBlock
  lastBlock = lastBlock || number;
  return {
    isBlock: number > -1 && number <= lastBlock,
    block: newValue
  };
};

function Navbar() {
  const [focus, setFocus] = useState(false);
  const [searchResults, setSearchResults] = useState<{ type: string, value: string | number} | null>(null);
  const [blockData, setBlockData] = useState<IBlocks | undefined>();
  console.log('blockData: ', blockData);
  const pathname = usePathname();

  const withp = pathname === ROUTER.HOME ? 'w-full' : 'w-[600px]';

  useEffect(() => {
    const fetchBlockData = async () => {
      if (searchResults?.type === 'block') {
        try {
          console.log('searchResults.value: ', searchResults.value);
          const response = await fetchOneBlock(searchResults.value);
          setBlockData(response?.data);
        } catch (error) {
          console.error('Error fetching block data:', error);
          setBlockData(undefined);
        }
      } else {
        setBlockData(undefined);
      }
    };

    fetchBlockData();
  }, [searchResults]);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim();

    if (!value) {
      setSearchResults(null);
      return;
    }

    const number = isValidBlockNumber(value, 100000000);
    const isHex = isHexString(value);
    const hex = isHex && add0x(value);
    const address = hex && isAddress(value);
    // const transaction = isTxOrBlockHash(hex);
    console.log('address: ', address);
    // const blockHash = transaction;

    console.log('number: ', number);
    // if (number.isBlock || blockHash) {
    //   setSearchResults({ type: 'block', value: number.block });
    // } else if (address) {
    //   setSearchResults({ type: 'address', value: hex });
    // } else if (transaction) {
    //   setSearchResults({ type: 'transaction', value: hex });
    // } else {
    //   setSearchResults(null);
    // }
  };

  const renderLink = () => {
    if (!searchResults) return null;

    let href = '';
    let label = '';

    switch (searchResults.type) {
      case 'block':
        href = `${ROUTER.BLOCKS.INDEX}/${searchResults.value}`;
        label = `Block ${searchResults.value}`;
        break;
      case 'address':
        href = `${ROUTER.ADDRESSES.INDEX}/${searchResults.value}`;
        label = `Address ${searchResults.value}`;
        break;
      case 'transaction':
        href = `${ROUTER.TXS.INDEX}/${searchResults.value}`;
        label = `Transaction ${searchResults.value}`;
        break;
      default:
        return null;
    }

    return (
      <div>
        <a href={href} className="text-blue-500 hover:underline">
          {label}
        </a>
      </div>
    );
  };

  return (
    <div className={`${withp} mt-5 relative`}>
      <input
        className="w-full h-11 rounded-lg bg-secondary text-white px-3 py-2 relative z-50"
        type="text"
        placeholder="Search by Token, block, Symbol, Rns"
        onFocus={() => setFocus(true)}
        onInput={handleInput}
        enterKeyHint="enter"
      />
      {focus && (
        <div className="w-full bg-secondary min-h-10 z-50 relative mt-4 rounded-lg p-4 border border-gray-500">
          <div className="text-white-400">Recent</div>
          {renderLink()}
        </div>
      )}
      {focus && (
        <div
          onClick={() => setFocus(false)}
          className="w-screen h-screen z-40 fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.8)]"
        ></div>
      )}
    </div>
  );
}

export default Navbar;
