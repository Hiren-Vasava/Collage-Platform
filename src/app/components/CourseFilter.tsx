// src/app/components/CourseFilter.tsx
'use client';

import { useState, useEffect } from 'react';

type CourseFilterProps = {
  onFilterChange: (program: string, semester: number) => void;
};

export default function CourseFilter({ onFilterChange }: CourseFilterProps) {
  const [program, setProgram] = useState('be');
  const [semester, setSemester] = useState(1);
  
  // Determine max semesters based on program
  const maxSemesters = program === 'be' ? 8 : 6;
  
  // Generate semester options
  const semesterOptions = Array.from({ length: maxSemesters }, (_, i) => i + 1);
  
  // Trigger filter change when either program or semester changes
  useEffect(() => {
    // If semester is out of range for the new program, reset to 1
    if (semester > maxSemesters) {
      setSemester(1);
      onFilterChange(program, 1);
    } else {
      onFilterChange(program, semester);
    }
  }, [program, semester, maxSemesters, onFilterChange]);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Filter Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
            Program
          </label>
          <select
            id="program"
            name="program"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="be">Bachelor of Engineering (BE)</option>
            <option value="diploma">Diploma Engineering</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-1">
            Semester
          </label>
          <select
            id="semester"
            name="semester"
            value={semester}
            onChange={(e) => setSemester(parseInt(e.target.value))}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {semesterOptions.map((num) => (
              <option key={num} value={num}>
                Semester {num}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
