// src/app/admin/documents/page.tsx
'use client';

import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import Link from 'next/link';

type Document = {
  id: string;
  title: string;
  type: 'pdf' | 'ppt' | 'doc' | 'xlsx' | 'question-paper' | 'notes' | 'other';
  uploadedBy: string;
  uploadDate: string;
  program: 'be' | 'diploma';
  semester: number;
  subject: string;
  status: 'pending' | 'approved' | 'rejected';
  downloads: number;
};

export default function DocumentReview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  
  // Mock document data
  const documentsData: Document[] = [
    { 
      id: '1', 
      title: 'Data Structures Lecture Notes', 
      program: 'be', 
      semester: 3, 
      subject: 'Data Structures and Algorithms',
      type: 'pdf', 
      uploadedBy: 'Dr. Jane Smith',
      uploadDate: '2025-01-15',
      status: 'pending',
      downloads: 0
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
      status: 'approved',
      downloads: 32
    },
    { 
      id: '3', 
      title: 'Midterm Exam Question Paper', 
      program: 'be', 
      semester: 3, 
      subject: 'Data Structures and Algorithms',
      type: 'question-paper', 
      uploadedBy: 'Dr. Jane Smith',
      uploadDate: '2025-01-20',
      status: 'pending',
      downloads: 0
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
      status: 'rejected',
      downloads: 0
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
      status: 'approved',
      downloads: 38
    }
  ];
  
  // Filter documents based on search query and filters
  const filteredDocuments = documentsData.filter(doc => {
    const matchesQuery = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      doc.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    
    return matchesQuery && matchesType && matchesStatus;
  });
  
  const handleViewDocument = (document: Document) => {
    setCurrentDocument(document);
    setIsViewModalOpen(true);
  };
  
  const handleApproveDocument = (documentId: string) => {
    // In a real application, this would update the document status
    console.log(`Approve document ${documentId}`);
  };
  
  const handleRejectDocument = (documentId: string) => {
    // In a real application, this would update the document status
    console.log(`Reject document ${documentId}`);
  };
  
  return (
    <MainLayout userRole="hod">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Document Review</h1>
          <p className="mt-1 text-sm text-gray-500">
            Review and manage documents uploaded by faculty members.
          </p>
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
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Document Type
              </label>
              <select
                id="type-filter"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF Document</option>
                <option value="ppt">Presentation</option>
                <option value="doc">Word Document</option>
                <option value="xlsx">Excel Spreadsheet</option>
                <option value="question-paper">Question Paper</option>
                <option value="notes">Lecture Notes</option>
                <option value="other">Other</option>
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
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Documents List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {filteredDocuments.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {filteredDocuments.map((doc) => (
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
                          ) : doc.type === 'question-paper' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          doc.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          doc.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.status === 'approved' ? 'Approved' : 
                          doc.status === 'rejected' ? 'Rejected' : 
                          'Pending Review'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {doc.uploadedBy}
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Uploaded on {new Date(doc.uploadDate).toLocaleDateString('en-US', { 
                            year: 'numeric',
                            month: 'long', 
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm sm:mt-0">
                        <button
                          onClick={() => handleViewDocument(doc)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                          View
                        </button>
                        
                        {doc.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveDocument(doc.id)}
                              className="ml-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectDocument(doc.id)}
                              className="ml-2 inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="-ml-0.5 mr-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
              <p className="mt-1 text-sm text-gray-500">
                No documents match your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* View Document Modal */}
      {isViewModalOpen && currentDocument && (
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
                    {currentDocument.title}
                  </h3>
                  <div className="mt-2">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-500">Document Type: 
                        <span className="ml-1 text-gray-900">
                          {currentDocument.type === 'pdf' ? 'PDF Document' : 
                           currentDocument.type === 'ppt' ? 'Presentation' :
                           currentDocument.type === 'doc' ? 'Word Document' :
                           currentDocument.type === 'xlsx' ? 'Excel Spreadsheet' :
                           currentDocument.type === 'question-paper' ? 'Question Paper' :
                           currentDocument.type === 'notes' ? 'Lecture Notes' : 'Other'
                          }
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-gray-500">Uploaded By: 
                        <span className="ml-1 text-gray-900">{currentDocument.uploadedBy}</span>
                      </p>
                      <p className="mt-1 text-sm text-gray-500">Upload Date: 
                        <span className="ml-1 text-gray-900">
                          {new Date(currentDocument.uploadDate).toLocaleDateString('en-US', { 
                            year: 'numeric',
                            month: 'long', 
                            day: 'numeric'
                          })}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-gray-500">Program: 
                        <span className="ml-1 text-gray-900">
                          {currentDocument.program === 'be' ? 'Bachelor of Engineering' : 'Diploma Engineering'}
                        </span>
                      </p>
                      <p className="mt-1 text-sm text-gray-500">Semester: 
                        <span className="ml-1 text-gray-900">{currentDocument.semester}</span>
                      </p>
                      <p className="mt-1 text-sm text-gray-500">Subject: 
                        <span className="ml-1 text-gray-900">{currentDocument.subject}</span>
                      </p>
                      <p className="mt-1 text-sm text-gray-500">Status: 
                        <span className={`ml-1 ${
                          currentDocument.status === 'approved' ? 'text-green-700' : 
                          currentDocument.status === 'rejected' ? 'text-red-700' : 
                          'text-yellow-700'
                        }`}>
                          {currentDocument.status === 'approved' ? 'Approved' : 
                           currentDocument.status === 'rejected' ? 'Rejected' : 
                           'Pending Review'}
                        </span>
                      </p>
                      {currentDocument.downloads > 0 && (
                        <p className="mt-1 text-sm text-gray-500">Downloads: 
                          <span className="ml-1 text-gray-900">{currentDocument.downloads}</span>
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900">Document Preview</h4>
                      <div className="mt-2 border-2 border-gray-300 border-dashed rounded-lg p-12 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">
                          Document preview would be shown here in a real application.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                {currentDocument.status === 'pending' && (
                  <>
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        handleApproveDocument(currentDocument.id);
                        setIsViewModalOpen(false);
                      }}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => {
                        handleRejectDocument(currentDocument.id);
                        setIsViewModalOpen(false);
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}