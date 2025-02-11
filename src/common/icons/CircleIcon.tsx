import React from 'react';

interface CircleIconProps {
  color?: string;
  size?: number;
}

const CircleIcon: React.FC<CircleIconProps> = ({
  color = '#79C600',
  size = 5,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 5 5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2.5" cy="2.5" r="2.5" fill={color} />
    </svg>
  );
};

export default CircleIcon;
