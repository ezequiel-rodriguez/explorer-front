import React from 'react';

type TableProps = {
  children: React.ReactNode;
};

type TableCellProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Table = ({ children }: TableProps) => {
  return <div className='w-full mt-6'>{children}</div>;
};

export const TableHeader = ({ children }: TableProps) => {
  return <div className='w-full bg-secondary rounded-tl-xl rounded-tr-xl flex h-13 p-5'>{children}</div>;
};

export const TableRow = ({ children }: TableProps) => {
  return <div className='flex h-min-13 p-4 hover:bg-secondary text-white-400 items-center'>{children}</div>;
};

export const TableCell = ({ children, className = 'flex-1 text-center' }: TableCellProps) => {
  return <div className={`flex-1 text-center ${className}`}>{children}</div>;
};
