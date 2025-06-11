import { render, screen, fireEvent } from '@testing-library/react';
import { HeatmapPage } from './HeatmapPage';
import type { EvaluationItem } from '../Types/evaluation';

describe('HeatmapPage', () => {
  const mockData: EvaluationItem[] = [
    {
      evaluation_id: '1',
      course_code: 'INFO8171-25S-S2',
      evaluation_type: 'Assignment',
      dueDay: '2025-06-10',
    },
    {
      evaluation_id: '2',
      course_code: 'INFO8171-25S-S2',
      evaluation_type: 'Quiz',
      dueDay: '2025-06-12',
    },
    {
      evaluation_id: '3',
      course_code: 'MATH1010-25S-S1',
      evaluation_type: 'Assignment',
      dueDay: '2025-07-01',
    },
  ];

  const renderPage = () =>
    render(<HeatmapPage data={mockData} onNavigate={jest.fn()} />);

  test('renders year, month, and course dropdowns', () => {
    renderPage();

    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/course/i)).toBeInTheDocument();

    expect(screen.getByRole('option', { name: 'INFO8171-25S-S2' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'MATH1010-25S-S1' })).toBeInTheDocument();
  });

  test('renders weekday headers in calendar grid', () => {
    renderPage();

    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach((day) => {
      expect(screen.getByRole('columnheader', { name: day })).toBeInTheDocument();
    });
  });

  test('renders evaluation item in the correct cell', () => {
    renderPage();

    
    expect(screen.getByText('INFO8171-25S-S2 - Assignment')).toBeInTheDocument();
    expect(screen.getByText('INFO8171-25S-S2 - Quiz')).toBeInTheDocument();
    expect(screen.getByText('MATH1010-25S-S1 - Assignment')).toBeInTheDocument();
  });

  test('renders "Go to Upload" button and triggers callback on click', () => {
    const mockNavigate = jest.fn();
    render(<HeatmapPage data={mockData} onNavigate={mockNavigate} />);

    const button = screen.getByRole('button', { name: /Go to Upload/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith('upload');
  });
});
