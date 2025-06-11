import type { EvaluationItem } from '../Types/evaluation';

/**
 * Returns all evaluations due on the specified day.
 * @param data List of evaluation items.
 * @param dateStr Target date string in 'YYYY-MM-DD' format.
 * @returns Matching evaluation items.
 */
export function getEvaluationsByDay(
  data: EvaluationItem[],
  dateStr: string
): EvaluationItem[] {
  return data.filter((item) =>
    item.dueDay.trim().slice(0, 10) === dateStr
  );
}
