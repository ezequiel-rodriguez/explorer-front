'use client';
import React, { ReactNode } from 'react';

type TableProps = {
  children: React.ReactNode;
};

interface TableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
}

export const Table = ({ children }: TableProps) => {
  return (
    <div className="w-full overflow-x-scroll md:overflow-visible mt-6">
      <div className="w-[900px] md:w-full">{children}</div>
    </div>
  );
};

export const TableHeader = ({ children }: TableProps) => {
  return (
    <div className="w-full bg-secondary rounded-tl-xl rounded-tr-xl flex h-13 p-5">
      {children}
    </div>
  );
};

export const TableRow = ({ children }: TableProps) => {
  return (
    <div className="flex h-min-13 p-4 hover:bg-secondary text-white-400 items-center">
      {children}
    </div>
  );
};

export const TableCell = ({
  children,
  className = 'flex-1 text-center flex justify-center',
  ...props
}: TableCellProps) => {
  return (
    <div
      className={`flex-1 text-center flex justify-center ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
