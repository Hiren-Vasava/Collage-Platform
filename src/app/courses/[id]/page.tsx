// src/app/courses/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import MainLayout from '../../components/MainLayout';

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
    description: 'This course covers fundamental data structures and algorithms used in computer science.',
    documents: [
      { id: '1', title: 'Course Syllabus', type: 'pdf', uploadedBy: 'Dr. Jane Smith', date: '2025-01-15' },
      { id: '2', title: 'Lecture Notes - Arrays and Linked Lists', type: 'pdf', uploadedBy: 'Dr. Jane Smith', date: '2025-01-20' },
      { id: '3', title: 'Sample Mid-term Questions', type: 'pdf', uploadedBy: 'Dr. Jane Smith', date: '2025-02-10' }
    ]
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
    description: 'Introduction to database concepts, design principles, and SQL programming.',
    documents: [
      { id: '4', title: 'SQL Basics Presentation', type: 'ppt', uploadedBy: 'Prof. Robert Johnson', date: '2025-01-18' },
      { id: '5', title: 'ER Diagram Assignment', type: 'pdf', uploadedBy: 'Prof. Robert Johnson', date: '2025-01-25' }
    ]
  },
  // Other course data...
];

export default function CourseDetailsPage() {
  const { id } = useParams();
  const [userRole] = useState('student'); // In a real app, this would come from auth context
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch course details
    const fetchCourse = () => {
      setLoading(true);
      // Find course by ID from our mock data
      const foundCourse = coursesData.find(c => c.id === id);
      
      // Simulate network delay
      setTimeout(() => {
        setCourse(foundCourse);
        setLoading(false);
      }, 500);
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <MainLayout userRole={userRole}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout userRole={userRole}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h1 className="text-xl font-medium text-gray-900 mb-4">Course Not Found</h1>
            <p className="text-gray-500 mb-4">The course you are looking for does not exist or you don't have access to it.</p>
            <Link
              href="/courses"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Courses
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole={userRole}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            href="/courses"
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Courses
          </Link>
        </div>
        
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            {/* Course Header */}
            <div className="mb-6">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {course.credits} Credits
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">Course Code: {course.code}</p>
            </div>
            
            {/* Course Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Course Details</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Instructor</p>
                      <p className="mt-1">{course.instructor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Program</p>
                      <p className="mt-1">{course.program === 'be' ? 'Bachelor of Engineering' : 'Diploma Engineering'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Semester</p>
                      <p className="mt-1">Semester {course.semester}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Enrollment Status</p>
                      <p className="mt-1">
                        {course.isEnrolled ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Enrolled
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Not Enrolled
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{course.description}</p>
                </div>
              </div>
            </div>
            
            {/* Course Materials and Documents */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Course Materials</h2>
              
              {course.documents && course.documents.length > 0 ? (
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Document Name
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Type
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Uploaded By
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Date
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Download</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {course.documents.map((doc) => (
                        <tr key={doc.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {doc.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase bg-blue-100 text-blue-800">
                              {doc.type}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {doc.uploadedBy}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {doc.date}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              type="button"
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Download
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-500">No course materials available yet.</p>
                </div>
              )}
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex justify-end">
              {!course.isEnrolled ? (
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Enroll in Course
                </button>
              ) : (
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Unenroll
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}