'use client';
import { ROUTER } from '@/common/constants';
import { CheckCopiedIcon, CopyIcon } from '@/common/icons';
import { getRouteStyles } from '@/common/utils/RouteColors';
import { useAppDataContext } from '@/context/AppContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

type RouteType = 'block' | 'address' | 'hash' | 'itx' | 'event' | 'empty';

type Props = {
  text: string | undefined;
  className?: string;
  trim?: number;
  type?: RouteType;
  showCopy?: boolean;
  group?: boolean;
};

const ToolTip: React.FC<Props> = ({
  text = '',
  className = '',
  trim = 4,
  type = 'empty',
  showCopy = true,
  group = false,
}) => {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const { widthScreen } = useAppDataContext();

  if (!text) return null;
  if (text.length < 24) trim = 0;
  if (widthScreen <= 1100 && text.length >= 60 && trim === 0) trim = 24;
  if (widthScreen <= 900 && text.length >= 24 && trim > 6) trim = 16;
  if (widthScreen <= 500 && text.length >= 24 && trim === 0) trim = 10;

  const trim1 = text.substring(0, trim);
  const trim2 = text.substring(text.length - trim);

  const handleCopy = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  const handleLinkClick = (event: React.MouseEvent) => {
    const isCopyButtonClicked = (event.target as HTMLElement).closest('button');
    if (isCopyButtonClicked) {
      event.preventDefault();
    }
  };

  const renderLinkOrText = (value: string, type: RouteType) => {
    const ROUTE_MAP = {
      block: `${ROUTER.BLOCKS.INDEX}/${text}`,
      address: `${ROUTER.ADDRESSES.INDEX}/${text}`,
      hash: `${ROUTER.TXS.INDEX}/${text}`,
      itx: `${ROUTER.ITXS.INDEX}/${text}`,
      event: `${ROUTER.EVENTS.INDEX}/${text}`,
      empty: undefined,
    };
    return ROUTE_MAP[type] ? (
      <Link
        href={ROUTE_MAP[type]}
        onClick={handleLinkClick}
        className="inline-block"
      >
        {value}
      </Link>
    ) : (
      <span>{value}</span>
    );
  };

  const textColor = getRouteStyles(pathname, ['text']);

  return (
    <div
      className={`relative inline-block px-2 border rounded-xl ${className} ${textColor} ${group ? 'border-dashed border-highlighted bg-dark-brown' : 'border-transparent'}`}
    >
      <div className="flex items-center">
        {trim > 0 ? (
          <div className="relative flex group justify-start">
            <p>{renderLinkOrText(trim1, type)}</p>
            <div className="w-4 flex justify-center">
              <p className="whitespace-normal">...</p>
            </div>
            <p>{renderLinkOrText(trim2, type)}</p>

            {/* Tooltip text */}
            <div
              className={`${text.length > 66 ? 'max-w-full' : 'max-w-[400px]'} absolute bottom-full mb-2 px-2 py-1 text-left text-sm bg-gray-600 text-white-400 rounded-lg break-words hidden group-hover:block transition-all duration-300 z-10 left-1/2 -translate-x-1/2 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-gray-600`}
            >
              {text}
            </div>
          </div>
        ) : (
          <span>{text}</span>
        )}

        {showCopy && (
          <div className="relative ml-1 group flex items-start">
            <button onClick={handleCopy} className="w-5 h-5">
              {copied ? (
                <CheckCopiedIcon />
              ) : (
                <CopyIcon className="fill-white-400 active:fill-white w-4 h-4" />
              )}
            </button>

            {/* Tooltip copy */}
            <div
              className={`absolute bottom-full mb-2 px-2 py-1 text-left text-sm bg-gray-600 text-white rounded-lg break-words hidden group-hover:block transition-all duration-300 z-50 left-1/2 -translate-x-1/2 after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-8 after:border-transparent after:border-t-gray-600`}
            >
              {copied ? 'Copied' : 'Copy'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolTip;
