import React from 'react';
import Log from './Log';
import { ILogs } from '@/common/interfaces/Txs';

type props = {
  logs: ILogs[] | undefined;
};

function LogsContainer({ logs }: props) {
  return (
    <div className="bg-secondary p-4 rounded-xl">
      {logs?.map((log, i) => (
        <Log
          key={i}
          className={`flex p-4 gap-6 w-full ${logs.length - 1 === i ? '' : 'border-b border-line'}`}
          i={i}
          log={log}
        />
      ))}
      {logs?.length === 0 && (
        <div className="text-center">Does Not Contain Logs</div>
      )}
    </div>
  );
}

export default LogsContainer;
