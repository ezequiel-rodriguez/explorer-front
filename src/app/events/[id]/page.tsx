'use client';
import EventDetail from '@/components/events/tabs/EventDetail';
import { EVENT_BTN_TABS } from '@/components/events/tabs/EventTab';
import LogsContainer from '@/components/txs/Logs/LogsContainer';
import Button from '@/components/ui/Button';
import { useEventDataContext } from '@/context/EventContext';
import { useTab } from '@/hooks/useTab';
import React from 'react';

export default function Page() {
  const { event } = useEventDataContext();
  const { changeTab, currentTab } = useTab({
    defaultTab: EVENT_BTN_TABS[0].tab,
  });

  return (
    <div className="mt-6">
      <div className="flex gap-4">
        {EVENT_BTN_TABS.map((btn, i) => (
          <Button
            key={i}
            label={btn.label}
            className={
              currentTab === btn.tab ? 'bg-btn-secondary text-white' : ''
            }
            onClick={() => changeTab(btn.tab)}
          />
        ))}
      </div>
      <div className="mt-6">
        {currentTab === 'overview' && <EventDetail />}
        {currentTab === 'log' && (
          <LogsContainer logs={event?.transaction.receipt.logs} />
        )}
      </div>
    </div>
  );
}
