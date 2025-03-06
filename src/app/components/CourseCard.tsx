// src/app/components/CourseCard.tsx
import Link from 'next/link';

type CourseCardProps = {
  id: string;
  title: string;
  code: string;
  instructor: string;
  credits: number;
  isEnrolled: boolean;
  program: string;
  semester: number;
};

export default function CourseCard({
  id,
  title,
  code,
  instructor,
  credits,
  isEnrolled,
  program,
  semester,
}: CourseCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
      {isEnrolled && (
        <div className="bg-green-100 px-4 py-1 border-b border-green-200">
          <span className="text-xs font-medium text-green-800">Enrolled</span>
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">Code: {code}</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {credits} Credits
          </span>
        </div>
        <p className="mt-3 text-sm text-gray-600">Instructor: {instructor}</p>
        <p className="mt-1 text-sm text-gray-600">
          {program === 'be' ? 'Bachelor of Engineering' : 'Diploma Engineering'} • Semester {semester}
        </p>
        <div className="mt-4 flex justify-between">
          <Link
            href={`/courses/${id}`}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Details
          </Link>
          
          {!isEnrolled && (
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
