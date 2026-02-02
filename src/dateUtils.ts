//import moment from "moment";
import { 
  getYear, 
  add as addDuration, 
  isWithinInterval, 
  isBefore, 
  isSameDay as isSameDayFns 
} from "date-fns";
import { DATE_UNIT_TYPES } from "./constants";

export function getCurrentYear(): number {
  //return moment().year();
  return getYear(new Date());
}

export function add(date: Date, amount: number, type = DATE_UNIT_TYPES.DAYS): Date {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }
  if (typeof amount !== 'number' || isNaN(amount)) {
    throw new Error('Invalid amount provided');
  }
  //return moment(date).add(amount, type).toDate();
  return addDuration(date, { [type]: amount });
}

export function isWithinRange(date: Date, from: Date, to: Date): boolean {
  if (isBefore(to, from)) {
    throw new Error('Invalid range: from date must be before to date');
  }

  return isWithinInterval(date, { start: from, end: to });
}

export function isDateBefore(date: Date, compareDate: Date): boolean {
  //return moment(date).isBefore(compareDate);
  return isBefore(date, compareDate);
}

export function isSameDay(date: Date, compareDate: Date): boolean {
  return isSameDayFns(date, compareDate);
  //return moment(date).isSame(compareDate, 'day');
}

// Simulates fetching holidays from an API
export async function getHolidays(year: number): Promise<Date[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        new Date(year, 0, 1),
        new Date(year, 11, 25),
        new Date(year, 11, 31),
      ]);
    }, 100);
  });
}

export async function isHoliday(date: Date): Promise<boolean> {
  const holidays = await getHolidays(date.getFullYear());
  return holidays.some(holiday => isSameDay(date, holiday));
}
