// src/app/courses/page.tsx
'use client';

import { useState, useEffect } from 'react';
import MainLayout from '../components/MainLayout';
import CourseFilter from '../components/CourseFilter';
import CourseCard from '../components/CourseCard';

// Mock data for demonstration
const coursesData = [
  {
    id: '1',
    title: 'Data Structures and Algorithms',
    code: 'CS201',
    instructor: 'Dr. Jane Smith',
    credits: 4,
    program: 'be',
    semester: 3,
    isEnrolled: true,
    description: 'This course covers fundamental data structures and algorithms used in computer science.'
  },
  {
    id: '2',
    title: 'Database Management Systems',
    code: 'CS301',
    instructor: 'Prof. Robert Johnson',
    credits: 4,
    program: 'be',
    semester: 5,
    isEnrolled: true,
    description: 'Introduction to database concepts, design principles, and SQL programming.'
  },
  {
    id: '3',
    title: 'Web Development',
    code: 'CS401',
    instructor: 'Dr. Michael Chen',
    credits: 3,
    program: 'be',
    semester: 5,
    isEnrolled: false,
    description: 'Learn modern web development technologies including HTML, CSS, JavaScript, and frameworks.'
  },
  {
    id: '4',
    title: 'Computer Networks',
    code: 'CS302',
    instructor: 'Prof. Sarah Williams',
    credits: 4,
    program: 'be',
    semester: 6,
    isEnrolled: false,
    description: 'Study of computer network architecture, protocols, and applications.'
  },
  {
    id: '5',
    title: 'Workshop Practice',
    code: 'ME101',
    instructor: 'Prof. David Miller',
    credits: 2,
    program: 'diploma',
    semester: 1,
    isEnrolled: false,
    description: 'Hands-on training in basic workshop tools and practices.'
  },
  {
    id: '6',
    title: 'Engineering Graphics',
    code: 'ME102',
    instructor: 'Dr. Lisa Taylor',
    credits: 3,
    program: 'diploma',
    semester: 2,
    isEnrolled: false,
    description: 'Introduction to technical drawing and CAD systems.'
  }
];

export default function CoursesPage() {
  const [userRole] = useState('student');
  const [selectedProgram, setSelectedProgram] = useState('be');
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [unenrolledCourses, setUnenrolledCourses] = useState([]);

  // Handle filter changes
  const handleFilterChange = (program, semester) => {
    setSelectedProgram(program);
    setSelectedSemester(semester);
  };

  // Filter courses based on program and semester
  useEffect(() => {
    // Always show all enrolled courses
    const allEnrolledCourses = coursesData.filter(course => course.isEnrolled);
    
    // Filter courses based on selected program and semester
    const filtered = coursesData.filter(
      course => course.program === selectedProgram && course.semester === selectedSemester
    );
    
    // Separate unenrolled courses
    const unenrolled = filtered.filter(course => !course.isEnrolled);
    
    setEnrolledCourses(allEnrolledCourses);
    setFilteredCourses(filtered);
    setUnenrolledCourses(unenrolled);
  }, [selectedProgram, selectedSemester]);

  return (
    <MainLayout userRole={userRole}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Courses</h1>
        
        <CourseFilter onFilterChange={handleFilterChange} />
        
        {/* Enrolled Courses Section - Always Visible */}
        {enrolledCourses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">My Enrolled Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  code={course.code}
                  instructor={course.instructor}
                  credits={course.credits}
                  isEnrolled={course.isEnrolled}
                  program={course.program}
                  semester={course.semester}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Available/Unenrolled Courses Section */}
        <div>
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            Available Courses for {selectedProgram === 'be' ? 'BE' : 'Diploma'} - Semester {selectedSemester}
          </h2>
          {unenrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unenrolledCourses.map(course => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  code={course.code}
                  instructor={course.instructor}
                  credits={course.credits}
                  isEnrolled={course.isEnrolled}
                  program={course.program}
                  semester={course.semester}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <p className="text-gray-500">No additional courses available for this semester.</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}