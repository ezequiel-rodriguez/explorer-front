import React from 'react';

interface OutputIconProps {
  width?: number;
  height?: number;
}

export default function OutputIcon ({ width = 7, height = 6 }: OutputIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 7 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 0.5V5.5H6"
        stroke="#B8B8B8"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
};
