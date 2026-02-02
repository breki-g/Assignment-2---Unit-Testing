import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  getCurrentYear, 
  add, 
  isWithinRange, 
  isDateBefore, 
  isSameDay, 
  getHolidays, 
  isHoliday 
} from '../dateUtils';
import { DATE_UNIT_TYPES } from '../constants';

describe("Date Utils", () => {
  
  describe("getCurrentYear()", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    it("should return the correct year", () => {
      vi.setSystemTime(new Date('2026-05-20'));
      expect(getCurrentYear()).toBe(2026);
    });
  });

  describe("add()", () => {
    it("should add the specified amount of days by default", () => {
      const date = new Date(2026, 0, 1); // Jan 1
      const result = add(date, 5, DATE_UNIT_TYPES.DAYS);
      expect(result.getDate()).toBe(6);
    });

    it("should throw an error for invalid date objects", () => {
      expect(() => add("not-a-date" as any, 5)).toThrow('Invalid date provided');
    });

    it("should throw an error if amount is not a number", () => {
      expect(() => add(new Date(), NaN)).toThrow('Invalid amount provided');
    });
  });

  describe("isWithinRange()", () => {
    it("should return true if date is between from and to", () => {
      const date = new Date(2026, 0, 5);
      const from = new Date(2026, 0, 1);
      const to = new Date(2026, 0, 10);
      expect(isWithinRange(date, from, to)).toBe(true);
    });

    it("should throw error if 'from' is after 'to'", () => {
      const from = new Date(2026, 0, 10);
      const to = new Date(2026, 0, 1);
      expect(() => isWithinRange(new Date(), from, to)).toThrow('Invalid range');
    });
  });

  describe("isSameDay()", () => {
    it("should return true for same day but different times", () => {
      const date1 = new Date(2026, 0, 1, 10, 0);
      const date2 = new Date(2026, 0, 1, 22, 0);
      expect(isSameDay(date1, date2)).toBe(true);
    });
  });

  describe("Async Holiday Functions", () => {
    it("getHolidays should return a list of 3 holidays for the year", async () => {
      const holidays = await getHolidays(2026);
      expect(holidays).toHaveLength(3);
      expect(holidays[0].getFullYear()).toBe(2026);
    });

    it("isHoliday should return true for New Year's Day", async () => {
      const newYearsDay = new Date(2026, 0, 1);
      const result = await isHoliday(newYearsDay);
      expect(result).toBe(true);
    });

    it("isHoliday should return false for a regular day", async () => {
      const regularDay = new Date(2026, 0, 2);
      const result = await isHoliday(regularDay);
      expect(result).toBe(false);
    });
  });
});