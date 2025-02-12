'use client';
import { ClockIcon } from '@/common/icons';
import { parseDate } from '@/common/utils/Time';
import React, { useState, useEffect } from 'react';

type props = {
  date: string | undefined;
  mode?: 'full' | 'timer';
};

function Date({ date, mode = 'full' }: props) {
  const [timeAgo, setTimeAgo] = useState('');
  const formattedDate = parseDate(date).formattedDate;

  useEffect(() => {
    setTimeAgo(parseDate(date).timeAgo);
    const interval = setInterval(() => {
      setTimeAgo(parseDate(date).timeAgo);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <span
      className={`flex items-center gap-2 ${mode === 'timer' ? 'min-w-16' : ''}`}
    >
      {mode === 'full' && <ClockIcon />}
      {timeAgo}
      {mode === 'full' && ` | ${formattedDate}`}
    </span>
  );
}

export default Date;
