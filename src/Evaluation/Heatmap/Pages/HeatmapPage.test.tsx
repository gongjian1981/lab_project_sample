import { render, screen } from '@testing-library/react';
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
  ];

  it('renders year and month dropdowns', () => {
    render(<HeatmapPage data={mockData} onNavigate={() => {}} />);
    expect(screen.getByRole('combobox', { name: /year/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /month/i })).toBeInTheDocument();
  });

  it('renders course dropdown with available course codes', () => {
    render(<HeatmapPage data={mockData} onNavigate={() => {}} />);
    expect(screen.getByRole('option', { name: /INFO8171-25S-S2/i })).toBeInTheDocument();
  });

  it('renders calendar grid', () => {
    render(<HeatmapPage data={mockData} onNavigate={() => {}} />);
    expect(screen.getByText(/Mon/i)).toBeInTheDocument();
    expect(screen.getByText(/Sun/i)).toBeInTheDocument();
  });

  it('renders Go to Upload button', () => {
    render(<HeatmapPage data={mockData} onNavigate={() => {}} />);
    expect(screen.getByRole('button', { name: /Go to Upload/i })).toBeInTheDocument();
  });
});
