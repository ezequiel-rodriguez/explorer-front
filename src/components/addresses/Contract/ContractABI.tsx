import Code from '@/components/ui/Code';
import React from 'react';

function ContractABI({ abi }: { abi: string | undefined }) {
  return (
    <div className="mt-4">
      <div className="mb-5 font-medium">Contract ABI</div>
      <Code code={abi} />
    </div>
  );
}

export default ContractABI;
