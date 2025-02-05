import React, { useEffect, useRef, useState } from 'react';
import { ArrowDownIcon, InfoIcon } from '@/common/icons';

export type DropDownOption = {
  key: string;
  title: string;
};

type VerificationMethodComponentProps = {
  title: string;
  selectedOption: DropDownOption;
  setSelectedOption: (option: DropDownOption) => void;
  elements: DropDownOption[];
  toggleLabel?: string;
  isToggleOn?: boolean;
  setIsToggleOn?: (isToggleOn: boolean) => void;
};

const FormDropdown = ({
  title,
  selectedOption,
  setSelectedOption,
  elements,
  toggleLabel = '',
  isToggleOn = false,
  setIsToggleOn = () => {},
}: VerificationMethodComponentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 rounded-lg" ref={dropdownRef}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <InfoIcon />
          <div className="text-white font-medium ml-2">{title}</div>
        </div>
      </div>
      <div className="relative">
        <button
          className="flex items-center justify-between w-full bg-gray-700 text-white-400 font-medium px-4 py-2 rounded-lg hover:bg-primary-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption.title}</span>
          <span className="ml-2">
            <ArrowDownIcon />
          </span>
        </button>
        {isOpen && (
          <ul className="absolute z-10 w-full mt-2 bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {elements.map((option) => (
              <li
                key={option.key}
                className="px-4 py-2 hover:bg-gray-500 cursor-pointer"
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
              >
                {option.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      {toggleLabel !== '' && (
        <div className="mt-4 flex items-center">
          <div
            className={`w-5 h-5 flex items-center justify-center rounded-sm border cursor-pointer ${
              isToggleOn
                ? 'bg-primary-600 border-primary-600'
                : 'bg-transparent border-gray-400'
            }`}
            onClick={() => setIsToggleOn(!isToggleOn)}
          >
            {isToggleOn && <div className="w-3 h-3 bg-white rounded-sm"></div>}
          </div>
          <span className="text-white-400 font-medium ml-3">{toggleLabel}</span>
        </div>
      )}
    </div>
  );
};

export default FormDropdown;
