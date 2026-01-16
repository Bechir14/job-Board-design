import { useJobContext } from '../context/JobContext';
import { JobCard } from '../components/JobCard';
import { SearchFilters } from '../components/SearchFilters';
import { AlertCircle } from 'lucide-react';

export function Home() {
  const { jobs, searchQuery, locationFilter, typeFilter, tagFilter } = useJobContext();

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = !locationFilter || job.location === locationFilter;
    const matchesType = !typeFilter || job.type === typeFilter;
    const matchesTag = !tagFilter || job.tags.includes(tagFilter);

    return matchesSearch && matchesLocation && matchesType && matchesTag;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 md:mb-0">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Find Your Next Startup Role
        </h1>
        <p className="text-gray-600">
          Discover exciting opportunities at fast-growing startups
        </p>
      </div>

      <div className="mb-6">
        <SearchFilters />
      </div>

      <div className="mb-4 text-sm text-gray-600">
        {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
      </div>

      {filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find more opportunities
          </p>
        </div>
      )}
    </div>
  );
}
