'use client';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-solidity';

import { useEffect } from 'react';

type Props = {
  code: string | undefined;
  height?: string;
};

function Code({ code }: Props) {
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
      className={`bg-gray-600 rounded-xl text-sm text-white-400 overflow-y-auto relative`}
    >
      {code?.includes('pragma') || code?.includes('function') || isJson() ? (
        <pre
          className={`language-solidity overflow-x-auto rounded-xl p-2 !bg-gray-600 !h-56`}
        >
          <code className="whitespace-pre-wrap break-words absolute bg-gray-600">
            {code}
          </code>
        </pre>
      ) : (
        <div className="p-2 min-h-9 break-all">{code}</div>
      )}
    </div>
  );
}

export default Code;
