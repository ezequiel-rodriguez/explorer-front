'use client'
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-solidity';

import { useEffect } from 'react';

type Props = {
  code: string | undefined;
  height?: string;
};

function Code({ code, height }: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  if (!code) return '';

  const isJson = (): boolean => {
    try {
      JSON.parse(code!);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div
      className={`bg-gray-600 min-h-fit rounded-xl overflow-y-auto break-all text-sm text-white-400 ${
        height ? height : 'max-h-36'
      }`}
    >
      {code?.includes('pragma') || code?.includes('function') || isJson() ? (
        <pre className="language-solidity">
          <code>{code}</code>
        </pre>
      ) : (
        <div className='p-2'>{code}</div>
      )}
    </div>
  );
}

export default Code;
