import { ILogs } from '@/common/interfaces/Txs';
import Code from '@/components/ui/Code';
import ToolTip from '@/components/ui/ToolTip';
import React from 'react';

function Log({
  log,
  i,
  className,
}: {
  log: ILogs;
  i: number;
  className?: string;
}) {
  return (
    <div className={`${className} text-sm`}>
      <div className="w-8 h-8 rounded-full border border-brand-purple text-brand-purple flex items-center justify-center text-sm">
        {i}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-8">
          <div className="w-1/12 text-end">Address</div>
          <div className="flex-1">
            <ToolTip text={log.address} trim={0} className="!px-0" />
          </div>
        </div>
        <div className="flex w-full mt-5 gap-8">
          <div className="w-1/12 text-white-400 text-end font-semibold">
            Topic
          </div>
          <div className="flex-1">
            {log.topics.map((t, i) => (
              <div key={i} className="flex gap-1 mb-4">
                <div className="bg-gray-600 border border-gray-700 rounded-md w-4 px-1 h-5 flex items-center justify-center text-sm font-thin">
                  {i}
                </div>
                <ToolTip text={t} trim={0} className="!text-white-100" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-8 mt-1">
          <div className="w-1/12 text-end text-white-400 font-semibold">
            Data
          </div>
          <div className="flex-1">
            <Code code={log.data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Log;
