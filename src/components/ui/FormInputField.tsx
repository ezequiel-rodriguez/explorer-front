import React from 'react';
import { InfoIcon } from '@/common/icons';

type InputFieldComponentProps = {
  title: string;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  toggleLabel?: string;
  maxLength?: number;
  isDisabled?: boolean;
  isToggleOn?: boolean;
  isLarge?: boolean;
  setIsToggleOn?: (isToggleOn: boolean) => void;
  errorMessage?: string;
};

const FormInputField = ({
  title,
  value,
  setValue,
  placeholder = '',
  toggleLabel = '',
  maxLength = 40,
  isDisabled = false,
  isToggleOn = false,
  isLarge = false,
  setIsToggleOn = () => {},
  errorMessage,
}: InputFieldComponentProps) => {
  return (
    <div className="p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <InfoIcon />
          <div className="text-white font-medium ml-2">{title}</div>
        </div>
      </div>
      {isLarge ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full bg-gray-700 text-white-400 font-medium px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none ${
            isDisabled ? 'cursor-not-allowed opacity-50' : ''
          } ${errorMessage && 'border border-red-500'}`}
          maxLength={maxLength}
          disabled={isDisabled}
          rows={3}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`w-full bg-gray-700 text-white-400 font-medium px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 ${
            isDisabled ? 'cursor-not-allowed opacity-50' : ''
          } ${errorMessage && 'border border-red-500'}`}
          maxLength={maxLength}
          disabled={isDisabled}
        />
      )}
      {toggleLabel !== '' && (
        <div className="mt-4 flex items-center">
          <div
            className={`w-5 h-5 flex items-center justify-center rounded-sm border cursor-pointer ${
              isToggleOn
                ? 'bg-primary-600 border-primary-600'
                : 'bg-transparent border-gray-400'
            }`}
            onClick={() => setIsToggleOn && setIsToggleOn(!isToggleOn)}
          >
            {isToggleOn && <div className="w-3 h-3 bg-white rounded-sm"></div>}
          </div>
          <span className="text-white-400 font-medium ml-3">{toggleLabel}</span>
        </div>
      )}
    </div>
  );
};

export default FormInputField;
