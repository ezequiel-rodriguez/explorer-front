'use client';

// import { useParams } from 'next/navigation';
import Divider from '@/components/ui/Divider';
import { Fragment } from 'react';

import FormInputField from '@/components/ui/FormInputField';

type Props = {
  libraries: { libraryName: string; libraryAddress: string }[];
  handleAddLibrary: () => void;
  handleRemoveLibrary: (index: number) => void;
  handleLibraryChange: (
    index: number,
    key: 'libraryName' | 'libraryAddress',
    value: string
  ) => void;
};
export default function ContractLibrariesSection({
  libraries,
  handleAddLibrary,
  handleRemoveLibrary,
  handleLibraryChange,
}: Props) {
  return (
    <Fragment>
      <div className="text-lg text-white-400 text-lg mt-4">
        Contract Libraries
      </div>
      <Divider />
      {libraries.map((library, index) => (
        <div className="flex gap-4 mt-4 items-center" key={index}>
          <div className="w-1/3">
            <FormInputField
              title="Library Name"
              placeholder="Name"
              value={library.libraryName}
              setValue={(value) =>
                handleLibraryChange(index, 'libraryName', value)
              }
              maxLength={50}
            />
          </div>
          <div className="flex-1">
            <FormInputField
              title="Library Contract Address"
              placeholder="0x..."
              value={library.libraryAddress}
              setValue={(value) =>
                handleLibraryChange(index, 'libraryAddress', value)
              }
              maxLength={100}
            />
          </div>
          <div className="flex items-end h-16 pr-4">
            <button
              className="bg-red-500 text-white font-medium px-3 py-1 rounded-md hover:bg-red-600 transition-colors h-8"
              onClick={() => handleRemoveLibrary(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        className="text-brand-pink hover:underline mt-4 text-left w-full text-md"
        onClick={handleAddLibrary}
      >
        + Add Library
      </button>
    </Fragment>
  );
}
