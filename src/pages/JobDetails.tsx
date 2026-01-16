import { useParams, Link, useNavigate } from 'react-router-dom';
import { useJobContext } from '../context/JobContext';
import { MapPin, Briefcase, DollarSign, Clock, Bookmark, ArrowLeft, ExternalLink, Building2 } from 'lucide-react';
import { useState } from 'react';

export function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, companies, isSaved, toggleSaveJob } = useJobContext();
  const [showApplySuccess, setShowApplySuccess] = useState(false);
  
  const job = jobs.find(j => j.id === id);
  const company = job ? companies.find(c => c.id === job.companyId) : null;
  
  if (!job || !company) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Job not found</h2>
        <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          ← Back to jobs
        </Link>
      </div>
    );
  }
  
  const saved = isSaved(job.id);
  
  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  const handleApply = () => {
    setShowApplySuccess(true);
    setTimeout(() => setShowApplySuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 md:mb-0">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-3xl flex-shrink-0">
            {company.logo}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              {job.title}
            </h1>
            <Link
              to={`/company/${company.id}`}
              className="text-lg text-gray-700 hover:text-blue-600 transition-colors inline-flex items-center gap-1.5"
            >
              {company.name}
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
          <button
            onClick={() => toggleSaveJob(job.id)}
            className={`p-2.5 rounded-lg transition-all flex-shrink-0 ${
              saved 
                ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' 
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Location</div>
              <div className="text-sm font-medium text-gray-900">{job.location}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Job Type</div>
              <div className="text-sm font-medium text-gray-900">{job.type}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Salary Range</div>
              <div className="text-sm font-medium text-gray-900">{job.salary}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Posted</div>
              <div className="text-sm font-medium text-gray-900">{getTimeAgo(job.postedDate)}</div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {job.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">About the Role</h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </div>

        {/* Responsibilities */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Responsibilities</h2>
          <ul className="space-y-2">
            {job.responsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Requirements</h2>
          <ul className="space-y-2">
            {job.requirements.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Info Preview */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">About {company.name}</h2>
          </div>
          <p className="text-gray-700 mb-4">{company.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded">
              {company.industry}
            </span>
            <span className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded">
              {company.size}
            </span>
            <span className="px-2.5 py-1 bg-white border border-gray-200 text-gray-700 text-xs rounded">
              {company.location}
            </span>
          </div>
          <Link
            to={`/company/${company.id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1"
          >
            View company profile
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Apply Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleApply}
            className="flex-1 sm:flex-initial px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Apply for this position
          </button>
          <button
            onClick={() => toggleSaveJob(job.id)}
            className={`px-6 py-3 rounded-lg border transition-colors font-medium ${
              saved
                ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {saved ? 'Saved' : 'Save for later'}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showApplySuccess && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          Application submitted successfully!
        </div>
      )}
    </div>
  );
}
