// src/app/admin/reports/page.tsx
'use client';

import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import Link from 'next/link';

type ReportTimeframe = 'week' | 'month' | 'semester' | 'year';

export default function DepartmentReports() {
  const [timeframe, setTimeframe] = useState<ReportTimeframe>('month');

  // Mock data for reports
  const facultyStatistics = {
    totalFaculty: 32,
    activeFaculty: 28,
    inactiveFaculty: 4,
    newFacultyThisSemester: 2,
    facultyByRole: [
      { role: 'Professor', count: 8 },
      { role: 'Associate Professor', count: 12 },
      { role: 'Assistant Professor', count: 10 },
      { role: 'Lecturer', count: 2 }
    ],
    facultyWithMostDocuments: 'Dr. Jane Smith'
  };

  const courseStatistics = {
    totalCourses: 48,
    activeCourses: 45,
    inactiveCourses: 3,
    coursesByProgram: [
      { program: 'Bachelor of Engineering', count: 32 },
      { program: 'Diploma Engineering', count: 16 }
    ],
    coursesBySemester: [
      { semester: 1, count: 6 },
      { semester: 2, count: 6 },
      { semester: 3, count: 6 },
      { semester: 4, count: 6 },
      { semester: 5, count: 6 },
      { semester: 6, count: 6 },
      { semester: 7, count: 6 },
      { semester: 8, count: 6 }
    ],
    mostEnrolledCourse: 'Data Structures and Algorithms'
  };

  const documentStatistics = {
    totalDocuments: 187,
    pendingDocuments: 15,
    approvedDocuments: 165,
    rejectedDocuments: 7,
    documentsByType: [
      { type: 'PDF', count: 92 },
      { type: 'PPT', count: 55 },
      { type: 'DOC', count: 18 },
      { type: 'Question Paper', count: 15 },
      { type: 'Notes', count: 7 }
    ],
    documentsUploadedThisMonth: 23
  };

  const studentStatistics = {
    totalStudents: 1462,
    studentsByProgram: [
      { program: 'Bachelor of Engineering', count: 1020 },
      { program: 'Diploma Engineering', count: 442 }
    ],
    studentsBySemester: [
      { semester: 1, count: 210 },
      { semester: 2, count: 202 },
      { semester: 3, count: 195 },
      { semester: 4, count: 190 },
      { semester: 5, count: 185 },
      { semester: 6, count: 180 },
      { semester: 7, count: 175 },
      { semester: 8, count: 125 }
    ],
    newEnrollmentsThisMonth: 45
  };

  const StatCard = ({ title, value, icon, trend, trendText }: { 
    title: string; 
    value: string | number; 
    icon: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
    trendText?: string;
  }) => {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
            
            {trendText && (
              <div className="mt-1">
                <span className={`text-xs font-medium ${
                  trend === 'up' ? 'text-green-600' :
                  trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {trendText}
                </span>
              </div>
            )}
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            {icon}
          </div>
        </div>
      </div>
    );
  };

  return (
    <MainLayout userRole="hod">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Department Reports</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview and statistics for your department.
          </p>
        </div>
        
        {/* Timeframe Filter */}
        <div className="mb-6">
          <div className="flex space-x-2">
            <button 
              onClick={() => setTimeframe('week')}
              className={`px-3 py-1 text-sm rounded-md ${timeframe === 'week' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
            >
              This Week
            </button>
            <button 
              onClick={() => setTimeframe('month')}
              className={`px-3 py-1 text-sm rounded-md ${timeframe === 'month' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
            >
              This Month
            </button>
            <button 
              onClick={() => setTimeframe('semester')}
              className={`px-3 py-1 text-sm rounded-md ${timeframe === 'semester' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
            >
              This Semester
            </button>
            <button 
              onClick={() => setTimeframe('year')}
              className={`px-3 py-1 text-sm rounded-md ${timeframe === 'year' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
            >
              This Year
            </button>
          </div>
        </div>
        
        {/* Faculty Statistics */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Faculty Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Faculty" 
              value={facultyStatistics.totalFaculty}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
            />
            <StatCard 
              title="Active Faculty" 
              value={facultyStatistics.activeFaculty}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              trend="up"
              trendText={`${Math.round((facultyStatistics.activeFaculty / facultyStatistics.totalFaculty) * 100)}% of total faculty`}
            />
            <StatCard 
              title="Inactive Faculty" 
              value={facultyStatistics.inactiveFaculty}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              trend="down"
              trendText={`${Math.round((facultyStatistics.inactiveFaculty / facultyStatistics.totalFaculty) * 100)}% of total faculty`}
            />
            <StatCard 
              title="New Faculty" 
              value={facultyStatistics.newFacultyThisSemester}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
              trend="up"
              trendText="Joined this semester"
            />
          </div>
          <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Faculty by Role</h3>
              <div className="mt-4">
                {facultyStatistics.facultyByRole.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">{item.role}</span>
                      <span className="text-sm font-medium text-gray-900">{item.count}</span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${(item.count / facultyStatistics.totalFaculty) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Statistics */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Course Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Courses" 
              value={courseStatistics.totalCourses}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
            <StatCard 
              title="Active Courses" 
              value={courseStatistics.activeCourses}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              trend="up"
              trendText={`${Math.round((courseStatistics.activeCourses / courseStatistics.totalCourses) * 100)}% of total courses`}
            />
            <StatCard 
              title="Inactive Courses" 
              value={courseStatistics.inactiveCourses}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              trend="down"
              trendText={`${Math.round((courseStatistics.inactiveCourses / courseStatistics.totalCourses) * 100)}% of total courses`}
            />
            <StatCard 
              title="Most Enrolled Course" 
              value={courseStatistics.mostEnrolledCourse}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Courses by Program</h3>
                <div className="mt-4">
                  {courseStatistics.coursesByProgram.map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{item.program}</span>
                        <span className="text-sm font-medium text-gray-900">{item.count}</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-blue-600 h-2.5 rounded-full" 
                          style={{ width: `${(item.count / courseStatistics.totalCourses) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Courses by Semester</h3>
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {courseStatistics.coursesBySemester.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="inline-block w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-blue-800">{item.count}</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Semester {item.semester}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Document Statistics */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Document Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Documents" 
              value={documentStatistics.totalDocuments}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />
            <StatCard 
              title="Pending Documents" 
              value={documentStatistics.pendingDocuments}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              trend="neutral"
              trendText="Awaiting review"
            />
            <StatCard 
              title="Approved Documents" 
              value={documentStatistics.approvedDocuments}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              trend="up"
              trendText={`${Math.round((documentStatistics.approvedDocuments / documentStatistics.totalDocuments) * 100)}% of total documents`}
            />
            <StatCard 
              title="Uploads This Month" 
              value={documentStatistics.documentsUploadedThisMonth}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              }
              trend="up"
              trendText="New uploads"
            />
          </div>
          <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Documents by Type</h3>
              <div className="mt-4">
                {documentStatistics.documentsByType.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">{item.type}</span>
                      <span className="text-sm font-medium text-gray-900">{item.count}</span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${(item.count / documentStatistics.totalDocuments) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Student Statistics */}
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Student Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Students" 
              value={studentStatistics.totalStudents}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <StatCard 
              title="BE Students" 
              value={studentStatistics.studentsByProgram[0].count}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              }
              trend="neutral"
              trendText={`${Math.round((studentStatistics.studentsByProgram[0].count / studentStatistics.totalStudents) * 100)}% of total students`}
            />
            <StatCard 
              title="Diploma Students" 
              value={studentStatistics.studentsByProgram[1].count}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              }
              trend="neutral"
              trendText={`${Math.round((studentStatistics.studentsByProgram[1].count / studentStatistics.totalStudents) * 100)}% of total students`}
            />
            <StatCard 
              title="New Enrollments" 
              value={studentStatistics.newEnrollmentsThisMonth}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              }
              trend="up"
              trendText="This month"
            />
          </div>
          <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Students by Semester</h3>
              <div className="mt-4">
                {studentStatistics.studentsBySemester.map((item, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Semester {item.semester}</span>
                      <span className="text-sm font-medium text-gray-900">{item.count} students</span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${(item.count / Math.max(...studentStatistics.studentsBySemester.map(s => s.count))) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}