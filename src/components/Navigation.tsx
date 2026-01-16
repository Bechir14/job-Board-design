import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Bookmark, PlusCircle, User } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-semibold text-gray-900">StartupJobs</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-1">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm ${
                  isActive('/') 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                Jobs
              </Link>
              <Link
                to="/saved"
                className={`px-3 py-2 rounded-md text-sm flex items-center gap-1.5 ${
                  isActive('/saved') 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                Saved
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link
              to="/post-job"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Post a Job
            </Link>
            
            <Link
              to="/profile"
              className={`p-2 rounded-lg ${
                isActive('/profile')
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
        <div className="flex items-center justify-around">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg ${
              isActive('/') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-xs">Jobs</span>
          </Link>
          <Link
            to="/saved"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg ${
              isActive('/saved') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Bookmark className="w-5 h-5" />
            <span className="text-xs">Saved</span>
          </Link>
          <Link
            to="/post-job"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg ${
              isActive('/post-job') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
            <span className="text-xs">Post</span>
          </Link>
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg ${
              isActive('/profile') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
