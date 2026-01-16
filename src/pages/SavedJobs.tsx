import { useJobContext } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export function SavedJobs() {
  const { jobs, savedJobs } = useJobContext();
  
  const saved = jobs.filter(job => savedJobs.includes(job.id));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 md:mb-0">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Saved Jobs
        </h1>
        <p className="text-gray-600">
          Your bookmarked positions for later review
        </p>
      </div>

      {saved.length > 0 ? (
        <>
          <div className="mb-4 text-sm text-gray-600">
            {saved.length} saved {saved.length === 1 ? 'job' : 'jobs'}
          </div>
          <div className="space-y-4">
            {saved.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <Bookmark className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No saved jobs yet</h3>
          <p className="text-gray-600 mb-6">
            Start browsing jobs and save the ones you're interested in
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Jobs
          </Link>
        </div>
      )}
    </div>
  );
}
