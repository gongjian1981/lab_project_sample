import { countEvaluationsInWeek } from './count-evaluations-in-week';
import type { EvaluationItem } from '../../Types/evaluation';

describe('countEvaluationsInWeek', () => {
  const mockData: EvaluationItem[] = [
    { evaluation_id: '1', course_code: 'C1', evaluation_type: 'Assignment', dueDay: '2025-06-10' },
    { evaluation_id: '2', course_code: 'C1', evaluation_type: 'Quiz',       dueDay: '2025-06-12' },
    { evaluation_id: '3', course_code: 'C2', evaluation_type: 'Assignment', dueDay: '2025-06-18' },
    { evaluation_id: '4', course_code: 'C2', evaluation_type: 'Quiz',       dueDay: 'invalid-date' },
  ];

  const week: Date[] = [
    new Date('2025-06-09'),
    new Date('2025-06-10'),
    new Date('2025-06-11'),
    new Date('2025-06-12'),
    new Date('2025-06-13'),
    new Date('2025-06-14'),
    new Date('2025-06-15'),
  ];

  it('counts evaluations whose dueDay is in the given week', () => {
    const result = countEvaluationsInWeek(mockData, week);
    expect(result).toBe(2);
  });

  it('returns 0 if no evaluations fall within the week', () => {
    const otherWeek = [
      new Date('2025-06-02'),
      new Date('2025-06-03'),
      new Date('2025-06-04'),
      new Date('2025-06-05'),
      new Date('2025-06-06'),
      new Date('2025-06-07'),
      new Date('2025-06-08'),
    ];
    const result = countEvaluationsInWeek(mockData, otherWeek);
    expect(result).toBe(0);
  });
});
