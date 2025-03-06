// src/app/documents/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MainLayout from '../components/MainLayout';

// Mock data for documents
const documentsData = [
  { 
    id: '1', 
    title: 'Data Structures Lecture Notes', 
    program: 'be', 
    semester: 3, 
    subject: 'Data Structures and Algorithms',
    type: 'pdf', 
    uploadedBy: 'Dr. Jane Smith',
    uploadDate: '2025-01-15',
    downloads: 45
  },
  { 
    id: '2', 
    title: 'Database Design Principles', 
    program: 'be', 
    semester: 5, 
    subject: 'Database Management Systems',
    type: 'ppt', 
    uploadedBy: 'Prof. Robert Johnson',
    uploadDate: '2025-01-18',
    downloads: 32
  },
  { 
    id: '3', 
    title: 'Computer Networks Overview', 
    program: 'be', 
    semester: 6, 
    subject: 'Computer Networks',
    type: 'pdf', 
    uploadedBy: 'Prof. Sarah Williams',
    uploadDate: '2025-01-20',
    downloads: 28
  },
  { 
    id: '4', 
    title: 'Workshop Safety Guidelines', 
    program: 'diploma', 
    semester: 1, 
    subject: 'Workshop Practice',
    type: 'pdf', 
    uploadedBy: 'Prof. David Miller',
    uploadDate: '2025-01-12',
    downloads: 56
  },
  { 
    id: '5', 
    title: 'Engineering Drawing Basics', 
    program: 'diploma', 
    semester: 2, 
    subject: 'Engineering Graphics',
    type: 'ppt', 
    uploadedBy: 'Dr. Lisa Taylor',
    uploadDate: '2025-01-17',
    downloads: 38
  }
];

export default function DocumentsPage() {
  const [userRole, setUserRole] = useState('student'); // Would come from auth context in real app
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [program, setProgram] = useState('all');
  const [semester, setSemester] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API call to fetch documents
    const fetchDocuments = () => {
      setIsLoading(true);
      
      // Simulate network delay
      setTimeout(() => {
        let filteredDocs = [...documentsData];
        
        // Apply program filter
        if (program !== 'all') {
          filteredDocs = filteredDocs.filter(doc => doc.program === program);
        }
        
        // Apply semester filter
        if (semester !== 'all') {
          filteredDocs = filteredDocs.filter(doc => doc.semester === parseInt(semester));
        }
        
        // Apply search query filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filteredDocs = filteredDocs.filter(doc => 
            doc.title.toLowerCase().includes(query) || 
            doc.subject.toLowerCase().includes(query) ||
            doc.uploadedBy.toLowerCase().includes(query)
          );
        }
        
        setDocuments(filteredDocs);
        setIsLoading(false);
      }, 500);
    };

    fetchDocuments();
  }, [program, semester, searchQuery]);

  return (
    <MainLayout userRole={userRole}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Course Documents</h1>
          
          {/* Only show upload button for faculty and HOD */}
          {(userRole === 'faculty' || userRole === 'hod') && (
            <Link
              href="/documents/upload"
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Upload New Document
            </Link>
          )}
        </div>
        
        {/* Filters */}
        <div className="bg-white shadow rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by title, subject, or uploader"
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
                value={program}
                onChange={(e) => setProgram(e.target.value)}
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
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="all">All Semesters</option>
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Semester {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Documents List */}
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
          </div>
        ) : documents.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <li key={doc.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {doc.type === 'pdf' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          ) : doc.type === 'ppt' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-blue-600">{doc.title}</h3>
                          <p className="text-sm text-gray-500">
                            {doc.subject} • {doc.program === 'be' ? 'BE' : 'Diploma'} • Semester {doc.semester}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-6 text-right">
                          <p className="text-xs text-gray-500">Uploaded by</p>
                          <p className="text-sm font-medium text-gray-900">{doc.uploadedBy}</p>
                          <p className="text-xs text-gray-500">{doc.uploadDate}</p>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No documents match your current filter criteria.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}