// src/app/admin/page.tsx
'use client';

import { useState } from 'react';
import MainLayout from '../components/MainLayout';
import AdminDashboard from './components/AdminDashboard';

export default function AdminPage() {
  const [userRole] = useState('hod'); // In a real app, this would come from auth context

  return (
    <MainLayout userRole={userRole}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard />
      </div>
    </MainLayout>
  );
}