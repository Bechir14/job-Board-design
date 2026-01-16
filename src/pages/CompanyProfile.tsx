import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJobContext } from '../context/JobContext';
import { MapPin, Users, Globe, ArrowLeft, ExternalLink } from 'lucide-react';
import { JobCard } from '../components/JobCard';

export function CompanyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies, jobs } = useJobContext();
  
  const company = companies.find(c => c.id === id);
  const companyJobs = jobs.filter(j => j.companyId === id);
  
  if (!company) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Company not found</h2>
        <p className="text-gray-600 mb-6">The company you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          ← Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 md:mb-0">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Company Header */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-4xl flex-shrink-0">
            {company.logo}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              {company.name}
            </h1>
            <p className="text-gray-600 mb-4">{company.industry}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1.5 text-gray-600">
                <MapPin className="w-4 h-4" />
                {company.location}
              </div>
              <div className="flex items-center gap-1.5 text-gray-600">
                <Users className="w-4 h-4" />
                {company.size}
              </div>
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700"
              >
                <Globe className="w-4 h-4" />
                Website
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">About {company.name}</h2>
          <p className="text-gray-700 leading-relaxed">{company.description}</p>
        </div>

        {/* Culture & Benefits */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Culture & Benefits</h2>
          <div className="flex flex-wrap gap-2">
            {company.culture.map((item, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-green-50 text-green-700 text-sm rounded-md border border-green-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Open Positions ({companyJobs.length})
          </h2>
        </div>
        
        {companyJobs.length > 0 ? (
          <div className="space-y-4">
            {companyJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-gray-600">No open positions at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
}
