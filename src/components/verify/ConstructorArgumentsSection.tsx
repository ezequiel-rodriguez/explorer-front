'use client';

import Divider from '@/components/ui/Divider';
import { Fragment } from 'react';
import FormInputField from '@/components/ui/FormInputField';

type Props = {
  constructorArgs: string;
  setConstructorArgs: (constructorArgs: string) => void;
  abiEncoded: boolean;
  setAbiEncoded: (abiEncoded: boolean) => void;
};
export default function ConstructorArgumentsSection({
  constructorArgs,
  setConstructorArgs,
  abiEncoded,
  setAbiEncoded,
}: Props) {
  return (
    <Fragment>
      <div className="text-lg text-white-400 text-lg mt-4">
        Constructor Arguments
      </div>
      <Divider />
      <FormInputField
        title="Constructor Arguments"
        placeholder="Args separated by commas. e.g. arg1, arg2, arg3..."
        value={constructorArgs}
        setValue={setConstructorArgs}
        maxLength={400}
        isDisabled={false}
        toggleLabel="ABI encoded"
        isToggleOn={abiEncoded}
        isLarge={true}
        setIsToggleOn={(state) => {
          setAbiEncoded(state);
        }}
      />
    </Fragment>
  );
}
