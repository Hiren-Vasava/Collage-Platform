'use client';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen border-2 border-red-500">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden border-2 border-blue-500">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 border-2 border-green-500">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}