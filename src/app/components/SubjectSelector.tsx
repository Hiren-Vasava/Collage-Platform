// src/app/components/SubjectSelector.tsx
'use client';

import { useState, useEffect } from 'react';

// Mock data for subjects by program and semester
const subjectsData = {
  be: {
    1: [
      { id: 's1', name: 'Engineering Mathematics I' },
      { id: 's2', name: 'Engineering Physics' },
      { id: 's3', name: 'Engineering Chemistry' },
      { id: 's4', name: 'Basic Electrical Engineering' },
      { id: 's5', name: 'Engineering Graphics' }
    ],
    2: [
      { id: 's6', name: 'Engineering Mathematics II' },
      { id: 's7', name: 'Programming for Problem Solving' },
      { id: 's8', name: 'Engineering Mechanics' },
      { id: 's9', name: 'Basic Electronics' },
      { id: 's10', name: 'Environmental Studies' }
    ],
    3: [
      { id: 's11', name: 'Data Structures and Algorithms' },
      { id: 's12', name: 'Digital Electronics' },
      { id: 's13', name: 'Object-Oriented Programming' },
      { id: 's14', name: 'Discrete Mathematics' },
      { id: 's15', name: 'Computer Organization' }
    ],
    // Add subjects for other semesters...
    8: [
      { id: 's41', name: 'Machine Learning' },
      { id: 's42', name: 'Cloud Computing' },
      { id: 's43', name: 'Data Science' },
      { id: 's44', name: 'Major Project' },
      { id: 's45', name: 'Professional Ethics' }
    ]
  },
  diploma: {
    1: [
      { id: 'd1', name: 'Communication Skills' },
      { id: 'd2', name: 'Applied Mathematics I' },
      { id: 'd3', name: 'Applied Physics I' },
      { id: 'd4', name: 'Applied Chemistry' },
      { id: 'd5', name: 'Workshop Practice' }
    ],
    2: [
      { id: 'd6', name: 'Applied Mathematics II' },
      { id: 'd7', name: 'Applied Physics II' },
      { id: 'd8', name: 'Basics of Information Technology' },
      { id: 'd9', name: 'Mechanical Engineering Drawing' },
      { id: 'd10', name: 'Basics of Electrical and Electronics Engineering' }
    ],
    // Add subjects for other semesters...
    6: [
      { id: 'd31', name: 'Industrial Management' },
      { id: 'd32', name: 'Entrepreneurship Development' },
      { id: 'd33', name: 'Project Work' },
      { id: 'd34', name: 'Professional Practice' },
      { id: 'd35', name: 'Industrial Training' }
    ]
  }
};

type SubjectSelectorProps = {
  program: string;
  semester: number;
  onSelectSubject: (subjectId: string, subjectName: string) => void;
};

export default function SubjectSelector({ program, semester, onSelectSubject }: SubjectSelectorProps) {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    // Get subjects based on program and semester
    if (program && semester) {
      const availableSubjects = subjectsData[program]?.[semester] || [];
      setSubjects(availableSubjects);
      
      // Reset selected subject when program or semester changes
      setSelectedSubject('');
    }
  }, [program, semester]);

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    setSelectedSubject(subjectId);
    
    // Find the selected subject name
    const subject = subjects.find(s => s.id === subjectId);
    if (subject) {
      onSelectSubject(subjectId, subject.name);
    }
  };

  return (
    <div>
      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
        Subject
      </label>
      <select
        id="subject"
        name="subject"
        value={selectedSubject}
        onChange={handleSubjectChange}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      >
        <option value="">Select a subject</option>
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </select>
    </div>
  );
}