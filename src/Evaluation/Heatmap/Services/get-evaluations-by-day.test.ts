import { getEvaluationsByDay } from './get-evaluations-by-day';
import type { EvaluationItem } from '../Types/evaluation';

describe('getEvaluationsByDay', () => {
  const mockData: EvaluationItem[] = [
    {
      evaluation_id: '1',
      course_code: 'INFO8171-25S-S2',
      evaluation_type: 'Assignment',
      dueDay: '2025-06-15',
    },
    {
      evaluation_id: '2',
      course_code: 'INFO8171-25S-S2',
      evaluation_type: 'Quiz',
      dueDay: '2025-06-15',
    },
    {
      evaluation_id: '3',
      course_code: 'MATH1010-25S-S1',
      evaluation_type: 'Assignment',
      dueDay: '2025-06-16',
    },
  ];

  it('returns all evaluations on the specified day', () => {
    const result = getEvaluationsByDay(mockData, '2025-06-15');
    expect(result.length).toBe(2);
    expect(result.map(e => e.evaluation_id)).toContain('1');
    expect(result.map(e => e.evaluation_id)).toContain('2');
  });

  it('returns an empty array if no evaluations on that day', () => {
    const result = getEvaluationsByDay(mockData, '2025-06-17');
    expect(result.length).toBe(0);
  });
});
