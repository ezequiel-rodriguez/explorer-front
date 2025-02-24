'use client';
import React, { ReactNode } from 'react';

type TableProps = {
  children: React.ReactNode;
};

interface TableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  type?: 'icon' | 'text';
}

export const Table = ({ children }: TableProps) => {
  return (
    <div className="w-full overflow-x-scroll md:overflow-visible mt-6 text-sm">
      <div className="w-[900px] md:w-full">{children}</div>
    </div>
  );
};

export const TableHeader = ({ children }: TableProps) => {
  return (
    <div className="w-full bg-secondary rounded-tl-xl rounded-tr-xl flex h-13 justify-center items-center border-b border-b-secondary relative z-10 top-1">
      {children}
    </div>
  );
};

export const TableRow = ({ children }: TableProps) => {
  return (
    <div className="flex min-h-14 py-2 hover:bg-secondary text-white-400 items-center border-t border-t-gray-700">
      {children}
    </div>
  );
};

export const TableCell = ({
  children,
  className,
  type = 'text',
  ...props
}: TableCellProps) => {
  return (
    <div
      className={`flex-1 text-center flex justify-center ${type === 'text' ? 'min-w-[120px]' : 'w-14 flex-initial'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
