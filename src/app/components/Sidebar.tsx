// src/app/components/Sidebar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SidebarProps = {
  userRole?: 'student' | 'faculty' | 'hod';
};

export default function Sidebar({ userRole = 'student' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <div className={`bg-gray-800 text-white h-screen transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        {!collapsed && <h2 className="text-xl font-semibold">Menu</h2>}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-md hover:bg-gray-700"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>
      
      <nav className="mt-4">
        <ul className="space-y-2 px-2">
          {/* Common links for all user roles */}
          <li>
            <Link 
              href="/courses"
              className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${isActive('/courses') ? 'bg-gray-700' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {!collapsed && <span className="ml-3">Courses</span>}
            </Link>
          </li>
          
          <li>
            <Link 
              href="/materials"
              className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${isActive('/materials') ? 'bg-gray-700' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {!collapsed && <span className="ml-3">Study Materials</span>}
            </Link>
          </li>
          
          {/* Faculty and HOD specific menu items */}
          {(userRole === 'faculty' || userRole === 'hod') && (
            <li>
              <Link 
                href="/documents/upload"
                className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${isActive('/documents/upload') ? 'bg-gray-700' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {!collapsed && <span className="ml-3">Upload Documents</span>}
              </Link>
            </li>
          )}
          
          {/* HOD specific Admin menu items */}
          {userRole === 'hod' && (
            <>
              {/* Admin Section Divider */}
              <li className="pt-5 pb-2">
                {!collapsed && (
                  <div className="px-2">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Admin Section
                    </p>
                    <div className="mt-1 h-px bg-gray-600"></div>
                  </div>
                )}
              </li>
              
              <li>
                <Link 
                  href="/admin"
                  className={`flex items-center p-2 rounded-md hover:bg-gray-700 ${isActive('/admin') ? 'bg-gray-700' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {!collapsed && <span className="ml-3">Admin Dashboard</span>}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}