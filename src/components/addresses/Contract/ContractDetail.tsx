import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import React, { useState } from 'react';
import ContractGeneral from './ContractGeneral';
import ContractInteraction from './ContractInteraction';

type ITab = 'general' | 'readcontract' | 'writecontract';

function ContractDetail() {
  const [tab, setTab] = useState<ITab>('general');

  return (
    <Card className="bg-secondary mt-6 w-full">
      <div className="flex gap-2">
        <Button
          label="General"
          type="small"
          className="bg-btn-secondary"
          onClick={() => setTab('general')}
        />
        <Button
          label="Read Contract"
          type="small"
          onClick={() => setTab('readcontract')}
        />
        <Button
          label="Write Contract"
          type="small"
          onClick={() => setTab('writecontract')}
        />
      </div>
      {tab === 'general' && <ContractGeneral />}
      {(tab === 'readcontract' || tab === 'writecontract') && (
        <ContractInteraction />
      )}
    </Card>
  );
}

export default ContractDetail;
