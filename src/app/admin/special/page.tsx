// src/app/admin/special/page.tsx
'use client';

import { useState } from 'react';
import MainLayout from '../../components/MainLayout';

type Tab = 'department-settings' | 'policy-management' | 'examination' | 'announcements';

export default function SpecialSection() {
  const [activeTab, setActiveTab] = useState<Tab>('department-settings');
  const [userRole] = useState('hod'); // In a real app, this would come from auth context

  const renderTabContent = () => {
    switch (activeTab) {
      case 'department-settings':
        return <DepartmentSettingsTab />;
      case 'policy-management':
        return <PolicyManagementTab />;
      case 'examination':
        return <ExaminationTab />;
      case 'announcements':
        return <AnnouncementsTab />;
      default:
        return null;
    }
  };

  return (
    <MainLayout userRole={userRole}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Specialized HOD Section</h1>
          <p className="mt-1 text-sm text-gray-500">
            Advanced tools and settings for department heads.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('department-settings')}
              className={`${
                activeTab === 'department-settings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Department Settings
            </button>
            <button
              onClick={() => setActiveTab('policy-management')}
              className={`${
                activeTab === 'policy-management'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Policy Management
            </button>
            <button
              onClick={() => setActiveTab('examination')}
              className={`${
                activeTab === 'examination'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Examination
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`${
                activeTab === 'announcements'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Announcements
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>
    </MainLayout>
  );
}

// Department Settings Tab Component
function DepartmentSettingsTab() {
  const [departmentName, setDepartmentName] = useState('Computer Science');
  const [departmentCode, setDepartmentCode] = useState('CS');
  const [email, setEmail] = useState('cs.department@college.edu');
  const [phone, setPhone] = useState('(555) 123-4567');
  const [location, setLocation] = useState('Building A, Floor 3');
  
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would save the settings to a database
    console.log('Save department settings');
  };
  
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Department Settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Configure your department's basic information and settings.
        </p>
        
        <form onSubmit={handleSaveSettings} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="department-name" className="block text-sm font-medium text-gray-700">
                Department Name
              </label>
              <input
                type="text"
                id="department-name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="department-code" className="block text-sm font-medium text-gray-700">
                Department Code
              </label>
              <input
                type="text"
                id="department-code"
                value={departmentCode}
                onChange={(e) => setDepartmentCode(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Department Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Department Phone
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Department Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Department Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                defaultValue="The Department of Computer Science offers programs in Bachelor of Engineering and Diploma in Computer Science. Our curriculum covers a wide range of subjects including programming, data structures, algorithms, database management, computer networks, and more."
              />
            </div>
          </div>
          
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Settings
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// Policy Management Tab Component
function PolicyManagementTab() {
  const [policies, setPolicies] = useState([
    {
      id: '1',
      title: 'Attendance Policy',
      description: 'Students must maintain at least 75% attendance in all courses to be eligible for examinations.',
      lastUpdated: '2025-01-10',
      status: 'active'
    },
    {
      id: '2',
      title: 'Academic Integrity Policy',
      description: 'Strict measures against plagiarism and academic dishonesty. Cases will be reviewed by the disciplinary committee.',
      lastUpdated: '2024-12-05',
      status: 'active'
    },
    {
      id: '3',
      title: 'Course Registration Policy',
      description: 'Students must register for courses within the first two weeks of the semester. Late registrations require HOD approval.',
      lastUpdated: '2024-11-15',
      status: 'active'
    }
  ]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPolicyTitle, setNewPolicyTitle] = useState('');
  const [newPolicyDescription, setNewPolicyDescription] = useState('');
  
  const handleAddPolicy = () => {
    // In a real application, this would add a new policy to the database
    const newPolicy = {
      id: (policies.length + 1).toString(),
      title: newPolicyTitle,
      description: newPolicyDescription,
      lastUpdated: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    
    setPolicies([...policies, newPolicy]);
    setIsAddModalOpen(false);
    setNewPolicyTitle('');
    setNewPolicyDescription('');
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Department Policies</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Create and manage department policies.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Policy
        </button>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {policies.map((policy) => (
            <li key={policy.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{policy.title}</h4>
                    <p className="mt-1 text-sm text-gray-500">{policy.description}</p>
                    <p className="mt-1 text-xs text-gray-400">Last updated: {policy.lastUpdated}</p>
                  </div>
                </div>
                <div className="flex">
                  <button className="text-blue-600 hover:text-blue-800 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Policy Modal */}
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
                    Add New Policy
                  </h3>
                  <div className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="policy-title" className="block text-sm font-medium text-gray-700">
                          Policy Title
                        </label>
                        <input
                          type="text"
                          id="policy-title"
                          value={newPolicyTitle}
                          onChange={(e) => setNewPolicyTitle(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="policy-description" className="block text-sm font-medium text-gray-700">
                          Policy Description
                        </label>
                        <textarea
                          id="policy-description"
                          rows={3}
                          value={newPolicyDescription}
                          onChange={(e) => setNewPolicyDescription(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddPolicy}
                >
                  Add Policy
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
    </div>
  );
}

// Examination Tab Component
function ExaminationTab() {
  const examTypes = [
    { id: '1', name: 'Mid-Term Examination', scheduled: true, date: '2025-03-15', status: 'upcoming' },
    { id: '2', name: 'End-Term Examination', scheduled: true, date: '2025-05-20', status: 'upcoming' },
    { id: '3', name: 'Laboratory Evaluation', scheduled: true, date: '2025-04-10', status: 'upcoming' },
    { id: '4', name: 'Viva Voce', scheduled: false, date: '', status: 'not-scheduled' }
  ];
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Examination Management</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Schedule and manage departmental examinations.
        </p>
      </div>
      <div className="border-t border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Examination Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {examTypes.map((exam) => (
              <tr key={exam.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{exam.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {exam.scheduled ? new Date(exam.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : 'Not scheduled'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    exam.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 
                    exam.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {exam.status === 'upcoming' ? 'Upcoming' : 
                     exam.status === 'completed' ? 'Completed' : 
                     'Not Scheduled'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    {exam.scheduled ? 'Edit' : 'Schedule'}
                  </button>
                  <button className="text-blue-600 hover:text-blue-900">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-5 sm:px-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Generate Examination Resources</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-md">
            <h5 className="font-medium text-gray-900">Seating Arrangement</h5>
            <p className="mt-1 text-sm text-gray-500">Generate seating arrangements for examinations.</p>
            <button className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Generate
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-md">
            <h5 className="font-medium text-gray-900">Examination Schedule</h5>
            <p className="mt-1 text-sm text-gray-500">Generate and publish examination schedule.</p>
            <button className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Generate
            </button>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-md">
            <h5 className="font-medium text-gray-900">Duty Allocation</h5>
            <p className="mt-1 text-sm text-gray-500">Allocate examination duties to faculty members.</p>
            <button className="mt-2 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Announcements Tab Component
function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState([
    {
      id: '1',
      title: 'Mid-Term Examination Schedule',
      content: 'The mid-term examinations will be conducted from March 15 to March 22. The detailed schedule has been published on the department notice board.',
      audience: 'All',
      date: '2025-03-01',
      author: 'Dr. Jane Smith'
    },
    {
      id: '2',
      title: 'Faculty Meeting',
      content: 'All faculty members are requested to attend a department meeting on March 5 at 3:00 PM in the conference room to discuss the upcoming semester plans.',
      audience: 'Faculty',
      date: '2025-02-28',
      author: 'Dr. Jane Smith'
    },
    {
      id: '3',
      title: 'Workshop on Artificial Intelligence',
      content: 'The department is organizing a workshop on Artificial Intelligence on March 10. Interested students and faculty members can register online.',
      audience: 'All',
      date: '2025-02-25',
      author: 'Prof. Robert Johnson'
    }
  ]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');
  const [newAnnouncementAudience, setNewAnnouncementAudience] = useState('All');
  
  const handleAddAnnouncement = () => {
    // In a real application, this would add a new announcement to the database
    const newAnnouncement = {
      id: (announcements.length + 1).toString(),
      title: newAnnouncementTitle,
      content: newAnnouncementContent,
      audience: newAnnouncementAudience,
      date: new Date().toISOString().split('T')[0],
      author: 'Dr. Jane Smith' // Assuming the current HOD
    };
    
    setAnnouncements([newAnnouncement, ...announcements]);
    setIsAddModalOpen(false);
    setNewAnnouncementTitle('');
    setNewAnnouncementContent('');
    setNewAnnouncementAudience('All');
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">Departmental Announcements</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Create and manage announcements for students and faculty.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Announcement
        </button>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {announcements.map((announcement) => (
            <li key={announcement.id} className="px-4 py-4 sm:px-6">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-900">{announcement.title}</h4>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  announcement.audience === 'All' ? 'bg-blue-100 text-blue-800' : 
                  announcement.audience === 'Faculty' ? 'bg-purple-100 text-purple-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {announcement.audience}
                </span>
              </div>
              <p className="text-sm text-gray-500">{announcement.content}</p>
              <div className="mt-2 flex items-center text-xs text-gray-400">
                <span>Posted on {new Date(announcement.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
                <span className="mx-1">•</span>
                <span>By {announcement.author}</span>
              </div>
              <div className="mt-2 flex">
                <button className="text-blue-600 hover:text-blue-800 text-sm mr-4">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 text-sm">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Add Announcement Modal */}
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
                    Create New Announcement
                  </h3>
                  <div className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="announcement-title" className="block text-sm font-medium text-gray-700">
                          Announcement Title
                        </label>
                        <input
                          type="text"
                          id="announcement-title"
                          value={newAnnouncementTitle}
                          onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="announcement-content" className="block text-sm font-medium text-gray-700">
                          Announcement Content
                        </label>
                        <textarea
                          id="announcement-content"
                          rows={3}
                          value={newAnnouncementContent}
                          onChange={(e) => setNewAnnouncementContent(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="announcement-audience" className="block text-sm font-medium text-gray-700">
                          Target Audience
                        </label>
                        <select
                          id="announcement-audience"
                          value={newAnnouncementAudience}
                          onChange={(e) => setNewAnnouncementAudience(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="All">All (Students & Faculty)</option>
                          <option value="Faculty">Faculty Only</option>
                          <option value="Students">Students Only</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAddAnnouncement}
                >
                  Publish Announcement
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
    </div>
  );
}