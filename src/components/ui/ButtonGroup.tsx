import React from 'react';

interface ButtonGroupProps {
  options: { label: string; value: string }[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, activeValue, onChange, className }) => {
  return (
    <div className={`flex border border-line rounded-xl overflow-hidden max-w-fit ${className}`}>
      {options.map((option, index) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 text-sm ${
            activeValue === option.value
              ? 'bg-btn-secondary text-white'
              : 'bg-transparent hover:bg-gray-500'
          } ${
            index === 0
              ? 'rounded-l-xl'
              : index === options.length - 1
              ? 'rounded-r-xl'
              : ''
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
