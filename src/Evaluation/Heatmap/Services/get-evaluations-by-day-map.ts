import type { EvaluationItem } from '../Types/evaluation';
import { getEvaluationsByDay } from './get-evaluations-by-day';

export function getEvaluationsByDayMap(
  data: EvaluationItem[],
  year: number,
  month: number
): Record<number, EvaluationItem[]> {
  const result: Record<number, EvaluationItem[]> = {};

  for (let day = 1; day <= 31; day++) {
    const date = new Date(year, month - 1, day);
    if (date.getMonth() !== month - 1) break;

    const dateStr = date.toISOString().slice(0, 10);
    const items = getEvaluationsByDay(data, dateStr);
    if (items.length > 0) {
      result[day] = items;
    }
  }

  return result;
}
