import { filterEvaluationsByMonth } from './filter-evaluations';
import type { EvaluationItem } from '../Types/evaluation';

describe('filterEvaluationsByMonth', () => {
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
      dueDay: '2025-07-10',
    },
    {
      evaluation_id: '3',
      course_code: 'MATH1010-25S-S1',
      evaluation_type: 'Assignment',
      dueDay: '2025-06-05',
    },
  ];

  it('filters evaluations by year and month', () => {
    const result = filterEvaluationsByMonth(mockData, 2025, 6);
    expect(result.length).toBe(2);
    expect(result.map(e => e.evaluation_id)).toContain('1');
    expect(result.map(e => e.evaluation_id)).toContain('3');
  });

  it('returns empty array if no matches found', () => {
    const result = filterEvaluationsByMonth(mockData, 2024, 6);
    expect(result.length).toBe(0);
  });
});