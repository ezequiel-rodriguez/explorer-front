import Code from '@/components/ui/Code'
import { useAddressDataContext } from '@/context/AddressContext'
import React from 'react'

function ByteCode() {
  const { address } = useAddressDataContext();
  return (
    <div className='mt-5'>
     <div className='font-medium mb-2'>Contract creation code</div>
      <Code
        code={address?.code}
      />
      <div className='mt-8 font-medium mb-2'>Deployed Bytecode</div>
      <Code
        code={address?.deployedCode}
      />
    </div>
  )
}

export default ByteCode
