'use client';

import Divider from '@/components/ui/Divider';
import FormDropdownComponent, {
  DropDownOption,
} from '@/components/ui/FormDropdown';

import { VerificationMethods } from '@/constants/verificationConstants';
import FormInputField from '@/components/ui/FormInputField';
import FormUploadFile from '@/components/ui/FormUploadFile';

import { Fragment } from 'react';

type Props = {
  isNightly: boolean;
  setIsNightly: (isNightly: boolean) => void;
  contractName: string;
  setContractName: (contractName: string) => void;
  filteredCompilers: DropDownOption[];
  verifMethod: DropDownOption;
  setVerifMethod: (verifMethod: DropDownOption) => void;
  compilerVersion: DropDownOption | undefined;
  setCompilerVersion: (compilerVersion: DropDownOption) => void;
  files: File[] | undefined;
  setFiles: (files: File[]) => void;
  errorContractName?: string;
  errorFiles?: string;
};

export default function GeneralDetailsSection({
  isNightly,
  setIsNightly,
  contractName,
  setContractName,
  filteredCompilers,
  verifMethod,
  setVerifMethod,
  compilerVersion,
  setCompilerVersion,
  errorContractName,
  errorFiles,
  files,
  setFiles,
}: Props) {
  return (
    <Fragment>
      <div className="text-lg text-white-400 text-lg">General Details</div>
      <Divider />
      <div className="text-sm text-brand-red mt-4">{errorContractName}</div>
      <FormDropdownComponent
        title="Verification Method"
        selectedOption={verifMethod}
        setSelectedOption={setVerifMethod}
        elements={VerificationMethods}
      />
      {compilerVersion && (
        <FormDropdownComponent
          title="Compiler Version"
          selectedOption={compilerVersion}
          setSelectedOption={setCompilerVersion}
          elements={filteredCompilers}
          toggleLabel="Include night builds"
          isToggleOn={isNightly}
          setIsToggleOn={setIsNightly}
        />
      )}
      <FormInputField
        title="Contract Name"
        value={contractName}
        setValue={setContractName}
        placeholder="Contract name"
        maxLength={50}
        errorMessage={errorContractName}
      />
      <FormUploadFile
        title="Upload Source Files"
        placeholder="Drop file or click here"
        allowMultiple={verifMethod.key === 'solidity'}
        acceptedFormats={verifMethod.key === 'solidity' ? ['.sol'] : ['.json']}
        errorMessage={errorFiles}
        files={files}
        setFiles={setFiles}
      />
    </Fragment>
  );
}
