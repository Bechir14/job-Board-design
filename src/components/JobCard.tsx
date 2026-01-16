import { Link } from 'react-router-dom';
import { MapPin, Clock, Bookmark } from 'lucide-react';
import { useJobContext } from '../context/JobContext';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    companyId: string;
    companyName: string;
    location: string;
    type: string;
    tags: string[];
    salary: string;
    description: string;
    postedDate: string;
  };
}

export function JobCard({ job }: JobCardProps) {
  const { isSaved, toggleSaveJob, companies } = useJobContext();
  const saved = isSaved(job.id);
  const company = companies.find(c => c.id === job.companyId);
  
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <Link to={`/job/${job.id}`} className="group">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-2xl flex-shrink-0">
                {company?.logo}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1 truncate">
                  {job.title}
                </h3>
                <Link 
                  to={`/company/${job.companyId}`}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {job.companyName}
                </Link>
              </div>
            </div>
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
              <span className="font-medium text-gray-700">{job.salary}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {job.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {job.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{getTimeAgo(job.postedDate)}</span>
          </div>
        </div>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSaveJob(job.id);
          }}
          className={`p-2 rounded-lg transition-all flex-shrink-0 ${
            saved 
              ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
              : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
          }`}
          aria-label={saved ? 'Unsave job' : 'Save job'}
        >
          <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>
    </div>
  );
}
