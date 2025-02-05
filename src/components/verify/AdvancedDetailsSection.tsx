'use client';

import Divider from '@/components/ui/Divider';
import FormDropdownComponent, {
  DropDownOption,
} from '@/components/ui/FormDropdown';
import { Fragment } from 'react';

import FormInputField from '@/components/ui/FormInputField';

type Props = {
  optimizationOn: boolean;
  setOptimizationOn: (optimizationOn: boolean) => void;
  optimizationValue: string;
  setOptimizationValue: (optimizationValue: string) => void;
  availableEvmVersions: DropDownOption[];
  evmVersion: DropDownOption | undefined;
  setEVMVersion: (evmVersion: DropDownOption | undefined) => void;
  errorMessage?: string;
};

export default function AdvancedDetailsSection({
  optimizationOn,
  setOptimizationOn,
  optimizationValue,
  setOptimizationValue,
  availableEvmVersions,
  evmVersion,
  setEVMVersion,
  errorMessage,
}: Props) {
  return (
    <Fragment>
      <div className="text-lg text-white-400 text-lg mt-4">
        Advanced Details
      </div>
      <Divider />
      <FormInputField
        title="Optimization Runs"
        placeholder="Optimization value"
        value={optimizationValue}
        setValue={setOptimizationValue}
        maxLength={15}
        isDisabled={!optimizationOn}
        toggleLabel="Enable optimization"
        isToggleOn={optimizationOn}
        setIsToggleOn={(state) => {
          setOptimizationOn(state);
        }}
        errorMessage={optimizationOn ? errorMessage : ''}
      />
      {evmVersion && (
        <FormDropdownComponent
          title="EVM Version"
          selectedOption={evmVersion}
          setSelectedOption={setEVMVersion}
          elements={availableEvmVersions}
        />
      )}
    </Fragment>
  );
}
