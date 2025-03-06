// src/app/admin/courses/page.tsx
'use client';

import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import Link from 'next/link';

type Course = {
  id: string;
  code: string;
  title: string;
  credits: number;
  program: 'be' | 'diploma';
  semester: number;
  instructor: string;
  description: string;
  status: 'active' | 'inactive';
  enrolledStudents: number;
};

export default function CourseManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [programFilter, setProgramFilter] = useState<'all' | 'be' | 'diploma'>('all');
  const [semesterFilter, setSemesterFilter] = useState<number | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  
  // Mock course data
  const coursesData: Course[] = [
    {
      id: '1',
      code: 'CS201',
      title: 'Data Structures and Algorithms',
      credits: 4,
      program: 'be',
      semester: 3,
      instructor: 'Dr. Jane Smith',
      description: 'This course covers fundamental data structures and algorithms used in computer science.',
      status: 'active',
      enrolledStudents: 42
    },
    {
      id: '2',
      code: 'CS301',
      title: 'Database Management Systems',
      credits: 4,
      program: 'be',
      semester: 5,
      instructor: 'Prof. Robert Johnson',
      description: 'Introduction to database concepts, design principles, and SQL programming.',
      status: 'active',
      enrolledStudents: 38
    },
    {
      id: '3',
      code: 'CS401',
      title: 'Web Development',
      credits: 3,
      program: 'be',
      semester: 5,
      instructor: 'Dr. Michael Chen',
      description: 'Learn modern web development technologies including HTML, CSS, JavaScript, and frameworks.',
      status: 'active',
      enrolledStudents: 45
    },
    {
      id: '4',
      code: 'CS302',
      title: 'Computer Networks',
      credits: 4,
      program: 'be',
      semester: 6,
      instructor: 'Prof. Sarah Williams',
      description: 'Study of computer network architecture, protocols, and applications.',
      status: 'inactive',
      enrolledStudents: 0
    },
    {
      id: '5',
      code: 'ME101',
      title: 'Workshop Practice',
      credits: 2,
      program: 'diploma',
      semester: 1,
      instructor: 'Prof. David Miller',
      description: 'Hands-on training in basic workshop tools and practices.',
      status: 'active',
      enrolledStudents: 35
    },
    {
      id: '6',
      code: 'ME102',
      title: 'Engineering Graphics',
      credits: 3,
      program: 'diploma',
      semester: 2,
      instructor: 'Dr. Lisa Taylor',
      description: 'Introduction to technical drawing and CAD systems.',
      status: 'active',
      enrolledStudents: 30
    }
  ];
  
  // Filter courses based on search query and filters
  const filteredCourses = coursesData.filter(course => {
    const matchesQuery = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProgram = programFilter === 'all' || course.program === programFilter;
    const matchesSemester = semesterFilter === 'all' || course.semester === semesterFilter;
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    
    return matchesQuery && matchesProgram && matchesSemester && matchesStatus;
  });
  
  const handleAddCourse = () => {
    // In a real application, this would handle form submission
    console.log('Add course');
    setIsAddModalOpen(false);
  };
  
  const handleEditCourse = (course: Course) => {
    setCurrentCourse(course);
    setIsAddModalOpen(true);
  };
  
  const handleStatusChange = (courseId: string, newStatus: 'active' | 'inactive') => {
    // In a real application, this would update the course status
    console.log(`Change status of course ${courseId} to ${newStatus}`);
  };
  
  return (
    <MainLayout userRole="hod">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Course Management</h1>
          <button
            onClick={() => {
              setCurrentCourse(null);
              setIsAddModalOpen(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Course
          </button>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Courses
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by course title, code, or instructor"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="program-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Program
              </label>
              <select
                id="program-filter"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value as 'all' | 'be' | 'diploma')}
              >
                <option value="all">All Programs</option>
                <option value="be">Bachelor of Engineering</option>
                <option value="diploma">Diploma Engineering</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="semester-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                id="semester-filter"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={semesterFilter}
                onChange={(e) => setSemesterFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              >
                <option value="all">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <option key={num} value={num}>
                    Semester {num}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status-filter"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Courses List */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          {filteredCourses.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructor
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Program / Semester
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Enrollment
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-800 font-medium">
                            {course.code.substring(0, 2)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-500">{course.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.instructor}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {course.program === 'be' ? 'Bachelor of Engineering' : 'Diploma Engineering'}
                      </div>
                      <div className="text-sm text-gray-500">Semester {course.semester}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {course.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.enrolledStudents} students
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditCourse(course)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleStatusChange(
                          course.id, 
                          course.status === 'active' ? 'inactive' : 'active'
                        )}
                        className={`${
                          course.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {course.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No courses match your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Course Modal */}
      {isAddModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {currentCourse ? 'Edit Course' : 'Add New Course'}
                  </h3>
                  <div className="mt-4">
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Course Title
                          </label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            defaultValue={currentCourse?.title || ''}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                            Course Code
                          </label>
                          <input
                            type="text"
                            name="code"
                            id="code"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            defaultValue={currentCourse?.code || ''}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
                            Credits
                          </label>
                          <input
                            type="number"
                            name="credits"
                            id="credits"
                            min="1"
                            max="6"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            defaultValue={currentCourse?.credits || 3}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                            Instructor
                          </label>
                          <input
                            type="text"
                            name="instructor"
                            id="instructor"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            defaultValue={currentCourse?.instructor || ''}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="program" className="block text-sm font-medium text-gray-700">
                            Program
                          </label>
                          <select
                            id="program"
                            name="program"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            defaultValue={currentCourse?.program || 'be'}
                          >
                            <option value="be">Bachelor of Engineering</option>
                            <option value="diploma">Diploma Engineering</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
                            Semester
                          </label>
                          <select
                            id="semester"
                            name="semester"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            defaultValue={currentCourse?.semester || 1}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <option key={num} value={num}>
                                Semester {num}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                            Status
                          </label>
                          <select
                            id="status"
                            name="status"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            defaultValue={currentCourse?.status || 'active'}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          defaultValue={currentCourse?.description || ''}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddCourse}
                >
                  {currentCourse ? 'Save Changes' : 'Add Course'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}