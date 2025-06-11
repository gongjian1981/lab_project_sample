import React, { useState } from 'react';
import type { EvaluationItem } from '../Types/evaluation';
import { filterEvaluationsByMonth } from '../Services/filter-evaluations';
import { getEvaluationsByDay } from '../Services/get-evaluations-by-day';
import { countEvaluationsInWeek } from '../Services/count-evaluations-in-week';

interface HeatmapPageProps {
  data: EvaluationItem[];
  onNavigate: (page: string) => void;
}

export const HeatmapPage: React.FC<HeatmapPageProps> = ({ data, onNavigate }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [selectedCourse, setSelectedCourse] = useState('');

  const filtered = filterEvaluationsByMonth(data, year, month)
    .filter(item => !selectedCourse || item.course_code === selectedCourse);

  const courseCodes = Array.from(new Set(data.map(d => d.course_code))).filter(Boolean);
  const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getCalendarMatrix = (): Date[][] => {
    const first = new Date(year, month - 1, 1);
    const last = new Date(year, month, 0);
    const matrix: Date[][] = [];

    let current = new Date(first);
    const offset = (current.getDay() + 6) % 7;
    current.setDate(current.getDate() - offset);

    while (current <= last || current.getDay() !== 1) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      matrix.push(week);
    }

    return matrix;
  };

  const calendar = getCalendarMatrix();

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-4 flex gap-4">
        <label>
          Year
          <select value={year} onChange={e => setYear(Number(e.target.value))}>
            {Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>

        <label>
          Month
          <select value={month} onChange={e => setMonth(Number(e.target.value))}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>

        {courseCodes.length > 0 && (
          <label>
            Course
            <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
              <option value="">All</option>
              {courseCodes.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      <table className="table-fixed border-collapse w-full text-center border text-sm">
        <thead>
          <tr>
            {dayHeaders.map(day => (
              <th key={day} className="border p-2 bg-gray-100">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calendar.map((week, wi) => {
            const highlight = countEvaluationsInWeek(filtered, week) >= 3;

            return (
              <tr key={wi} className={highlight ? "bg-red-300" : ""}>
                {week.map((day, di) => {
                  const items = getEvaluationsByDay(filtered, day.toISOString().slice(0, 10));
                  return (
                    <td key={di} className="border align-top p-1 text-left">
                      <div className="font-bold">{day.getMonth() + 1 === month ? day.getDate() : ''}</div>
                      {items.map((ev, i) => (
                        <div key={i}>
                          {ev.course_code} - {ev.evaluation_type}
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-6 text-center">
        <button
          onClick={() => onNavigate('upload')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Go to Upload
        </button>
      </div>
    </div>
  );
};
