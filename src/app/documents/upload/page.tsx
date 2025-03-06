
// src/app/documents/upload/page.tsx
'use client';

import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import DocumentUploadForm from '../../components/DocumentUploadForm';

export default function DocumentUploadPage() {
  const [userRole] = useState('faculty'); // Would come from auth context in real app

  return (
    <MainLayout userRole={userRole}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Upload Document</h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload course materials, presentations, question papers, or other resources for students.
          </p>
        </div>
        
        <DocumentUploadForm userRole={userRole} />
      </div>
    </MainLayout>
  );
}