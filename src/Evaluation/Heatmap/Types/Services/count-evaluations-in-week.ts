import type { EvaluationItem } from '../../Types/evaluation';

/**
 * Counts how many evaluations fall within the given week.
 * @param data The list of evaluation items.
 * @param weekDays An array of Date objects representing one week.
 * @returns The number of evaluations due on any day in that week.
 */
export function countEvaluationsInWeek(
  data: EvaluationItem[],
  weekDays: Date[]
): number {
  return data.filter((item) => {
    const dueDate = new Date(item.dueDay.trim());
    if (isNaN(dueDate.getTime())) return false;

    return weekDays.some((day) =>
      dueDate.getFullYear() === day.getFullYear() &&
      dueDate.getMonth() === day.getMonth() &&
      dueDate.getDate() === day.getDate()
    );
  }).length;
}
