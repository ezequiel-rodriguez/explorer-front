import { CodePageIcon } from '@/common/icons';
import Code from '@/components/ui/Code';
import { useAddressDataContext } from '@/context/AddressContext';
import React, { useEffect, useState } from 'react'

interface IFile {
  file: string
  content: string
}
function ContractCode() {
  const { contractVerification: contract } = useAddressDataContext();
  const [fileSelected, setFileSelected] = useState<IFile | undefined>(contract?.sources[0]);
  const [sourceCode, setSourceCode] = useState<IFile | undefined>();
  const [sources, setSources] = useState<IFile[] | undefined>();

  const handleSelectFile = (file: IFile) => {
    setFileSelected(file);
  }

  useEffect(() => {
    if (contract?.sources) {
      setFileSelected(contract?.sources[0]);
      const source = contract?.sources.find((s) => s.file.includes(contract.request.name))
      setSourceCode(source);
      const sources = contract?.sources.filter((s) => !s.file.includes(contract.request.name))
      setSources(sources);
    }
  }, [contract?.request.name, contract?.sources]);

  return (
    <div className='mt-4'>
      <div className='flex gap-1 items-center font-medium'>
        <CodePageIcon /> 
        Contract Source Code
        <span className='text-white-400'>(Solidity)</span>
      </div>
      <div className='my-4 text-white-100'>{`${contract?.request.name}.sol`}</div>
      <Code
        height='h-52'
        code={sourceCode?.content}
      />
      {
        sourceCode?.content !== fileSelected?.content && (
          <>
            <div className='flex items-center gap-1 mt-5 font-medium'><CodePageIcon /> Dependency Contracts</div>
            <div className='my-5 flex gap-2'>
              {
                sources?.map((x, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectFile(x)}
                    className={`${fileSelected?.file === x.file ? 'text-brand-pink' : ''}`}
                  >
                    {x.file}
                  </button>
                ))
              }
            </div>
            <div>
              <Code
                height='h-52'
                code={fileSelected?.content}
              />
            </div>
          </>
        )
      }
      <div className='mt-5'>
        {
          contract?.result.encodedConstructorArguments &&
          (
            <>
              <div className='mb-4'>Encoded</div>
              <Code
                code={contract?.result.encodedConstructorArguments}
              />
            </>
          )
        }
      </div>
    </div>
  )
}

export default ContractCode
