import { useAddressDataContext } from '@/context/AddressContext'
import React from 'react'

function ReadProxy() {
  const { address, contractVerification } = useAddressDataContext()
  // console.dir({ address, contractVerification }, { depth: null })
  return (
    <div>
      Read Proxy Methods
    </div>
  )
}

export default ReadProxy
