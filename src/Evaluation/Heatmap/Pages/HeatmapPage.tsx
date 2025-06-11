import React, { useState } from 'react';
import type { EvaluationItem } from '../Types/evaluation';
import { getEvaluationsByDayMap } from '../Services/get-evaluations-by-day-map';

export interface HeatmapPageProps {
  data: EvaluationItem[];
  onNavigate: (to: string) => void;
}

const HeatmapPage: React.FC<HeatmapPageProps> = ({ data, onNavigate }) => {
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [selectedCourse, setSelectedCourse] = useState('');

  const courses = Array.from(new Set(data.map(d => d.course_code)));
  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const filteredData = selectedCourse
    ? data.filter(item => item.course_code === selectedCourse)
    : data;

  const evaluationsByDay = getEvaluationsByDayMap(filteredData, selectedYear, selectedMonth);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Evaluation Heatmap</h1>

      <div className="flex space-x-4 mb-4">
        <label>
          Year
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="ml-2 border p-2"
          >
            {[2024, 2025].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>

        <label>
          Month
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="ml-2 border p-2"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>

        <label>
          Course
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="ml-2 border p-2"
          >
            <option value="">All</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </label>

        <button
          onClick={() => onNavigate('upload')}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Upload
        </button>
      </div>

      <table className="table-fixed w-full border-collapse">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <th key={day} className="border p-2 bg-gray-100">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(() => {
            const rows: React.ReactElement[] = [];
            let cells: React.ReactElement[] = [];
            for (let day of daysArray) {
              const date = new Date(selectedYear, selectedMonth - 1, day);
              const weekday = date.getDay();

              if (day === 1) {
                cells = Array(weekday).fill(<td key={`empty-${day}-${weekday}`} />);
              }

              const evaluations = evaluationsByDay[day] || [];
              cells.push(
                <td key={day} className="border p-2 align-top">
                  <div className="font-bold">{day}</div>
                  {evaluations.map((item, index) => (
                    <div key={index}>
                      {`${item.course_code} - ${item.evaluation_type}`}
                    </div>
                  ))}
                </td>
              );

              if (date.getDay() === 6 || day === daysArray[daysArray.length - 1]) {
                rows.push(<tr key={`row-${day}`}>{cells}</tr>);
                cells = [];
              }
            }
            return rows;
          })()}
        </tbody>
      </table>
    </div>
  );
};

export default HeatmapPage;
