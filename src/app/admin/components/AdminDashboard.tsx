// src/app/admin/components/AdminDashboard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

type AdminStat = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
};

type AdminCardProps = {
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
  icon: React.ReactNode;
};

const StatCard = ({ title, value, icon, change, trend }: AdminStat) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
          
          {change && (
            <div className="mt-1">
              <span className={`text-xs font-medium ${
                trend === 'up' ? 'text-green-600' :
                trend === 'down' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {change}
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

const AdminActionCard = ({ title, description, linkHref, linkText, icon }: AdminCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-start">
        <div className="p-3 bg-blue-50 rounded-lg mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <Link href={linkHref} className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
            {linkText}
            <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'semester'>('week');
  
  const statistics: AdminStat[] = [
    {
      title: 'Total Faculty',
      value: 32,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      change: '+2 since last semester',
      trend: 'up'
    },
    {
      title: 'Active Courses',
      value: 48,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      change: 'No change',
      trend: 'neutral'
    },
    {
      title: 'Document Uploads',
      value: 187,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      change: '+23 this week',
      trend: 'up'
    },
    {
      title: 'Student Enrollment',
      value: 1462,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      change: '+45 since last month',
      trend: 'up'
    }
  ];
  
  const adminActions: AdminCardProps[] = [
    {
      title: 'Faculty Management',
      description: 'Add, edit, or remove faculty members from your department',
      linkHref: '/admin/faculty',
      linkText: 'Manage Faculty',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: 'Course Management',
      description: 'Create, update, and organize courses for your department',
      linkHref: '/admin/courses',
      linkText: 'Manage Courses',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: 'Document Review',
      description: 'Review and approve document uploads from faculty members',
      linkHref: '/admin/documents',
      linkText: 'Review Documents',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: 'Department Reports',
      description: 'Generate and view reports for your department',
      linkHref: '/admin/reports',
      linkText: 'View Reports',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];
  
  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Admin Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Department Statistics</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setDateRange('today')}
              className={`px-3 py-1 text-sm rounded-md ${dateRange === 'today' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
            >
              Today
            </button>
            <button 
              onClick={() => setDateRange('week')}
              className={`px-3 py-1 text-sm rounded-md ${dateRange === 'week' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
            >
              This Week
            </button>
            <button 
              onClick={() => setDateRange('month')}
              className={`px-3 py-1 text-sm rounded-md ${dateRange === 'month' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
            >
              This Month
            </button>
            <button 
              onClick={() => setDateRange('semester')}
              className={`px-3 py-1 text-sm rounded-md ${dateRange === 'semester' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'}`}
            >
              Semester
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
      
      {/* Admin Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Admin Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminActions.map((action, index) => (
            <AdminActionCard key={index} {...action} />
          ))}
        </div>
      </div>
    </div>
  );
}