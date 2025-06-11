import type { EvaluationItem } from '../../Types/evaluation';

/**
 * Filters evaluation items by year and month.
 * @param data The full list of evaluation items.
 * @param year The target year (e.g., 2025).
 * @param month The target month (1–12).
 * @returns A filtered array of evaluation items.
 */
export function filterEvaluationsByMonth(
  data: EvaluationItem[],
  year: number,
  month: number
): EvaluationItem[] {
  return data.filter((item) => {
    const date = new Date(item.dueDay.trim());
    return (
      !isNaN(date.getTime()) &&
      date.getFullYear() === year &&
      date.getMonth() + 1 === month
    );
  });
}
