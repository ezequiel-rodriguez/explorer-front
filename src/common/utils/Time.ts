import {
  format,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

interface Response {
  timeAgo: string;
  formattedDate: string;
}

export const parseDate = (timestamp: number | string | undefined): Response => {
  if (!timestamp) return { timeAgo: '', formattedDate: '' };

  const date = new Date(
    Number(timestamp) < 1e10 ? Number(timestamp) * 1000 : Number(timestamp),
  );
  const now = new Date();

  const utcDate = toZonedTime(date, 'UTC');
  const formattedDate = format(utcDate, "MMM dd yyyy HH:mm:ss 'UTC'");

  const differenceInYearsValue = differenceInYears(now, date);
  const differenceInMonthsValue = differenceInMonths(now, date);
  const differenceInDaysValue = differenceInDays(now, date);
  const differenceInHoursValue = differenceInHours(now, date);
  const differenceInMinutesValue = differenceInMinutes(now, date);
  const differenceInSecondsValue = differenceInSeconds(now, date);

  let timeAgo = '';

  if (differenceInYearsValue > 0) {
    timeAgo = `${differenceInYearsValue}y ago`;
  } else if (differenceInMonthsValue > 0) {
    timeAgo = `${differenceInMonthsValue}M ago`;
  } else if (differenceInDaysValue > 0) {
    timeAgo = `${differenceInDaysValue}d ago`;
  } else if (differenceInHoursValue > 0) {
    timeAgo = `${differenceInHoursValue}h ago`;
  } else if (differenceInMinutesValue > 0) {
    timeAgo = `${differenceInMinutesValue}m ago`;
  } else {
    timeAgo = `${differenceInSecondsValue}s ago`;
  }

  return { timeAgo, formattedDate };
};
