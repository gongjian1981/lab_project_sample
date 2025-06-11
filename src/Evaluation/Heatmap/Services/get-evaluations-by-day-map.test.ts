import { getEvaluationsByDayMap } from './get-evaluations-by-day-map';
import type { EvaluationItem } from '../Types/evaluation';

const mockData: EvaluationItem[] = [
  {
    evaluation_id: '1',
    course_code: 'INFO8171-25S-S2',
    evaluation_type: 'Assignment',
    dueDay: '2025-06-10'
  },
  {
    evaluation_id: '2',
    course_code: 'INFO8171-25S-S2',
    evaluation_type: 'Quiz',
    dueDay: '2025-06-10'
  },
  {
    evaluation_id: '3',
    course_code: 'MATH1010-25S-S1',
    evaluation_type: 'Exam',
    dueDay: '2025-06-15'
  }
];

describe('getEvaluationsByDayMap', () => {
  it('groups evaluations by day of the month', () => {
    const result = getEvaluationsByDayMap(mockData, 2025, 6);

    expect(Object.keys(result).length).toBe(2);
    expect(result[10]).toHaveLength(2);
    expect(result[15]).toHaveLength(1);
  });

  it('returns empty object if no evaluation in month', () => {
    const result = getEvaluationsByDayMap(mockData, 2025, 7);
    expect(result).toEqual({});
  });
});
