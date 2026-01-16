import { Search, MapPin, Briefcase, Tag, X } from 'lucide-react';
import { useJobContext } from '../context/JobContext';

export function SearchFilters() {
  const { 
    searchQuery, 
    setSearchQuery,
    locationFilter,
    setLocationFilter,
    typeFilter,
    setTypeFilter,
    tagFilter,
    setTagFilter,
  } = useJobContext();

  const hasActiveFilters = locationFilter || typeFilter || tagFilter;

  const clearAllFilters = () => {
    setLocationFilter('');
    setTypeFilter('');
    setTagFilter('');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by job title or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
          >
            <option value="">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="San Francisco, CA">San Francisco, CA</option>
            <option value="New York, NY">New York, NY</option>
            <option value="Austin, TX">Austin, TX</option>
            <option value="London, UK">London, UK</option>
            <option value="Boston, MA">Boston, MA</option>
          </select>
        </div>

        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
          >
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>

        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
          >
            <option value="">All Skills</option>
            <option value="React">React</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Python">Python</option>
            <option value="Node.js">Node.js</option>
            <option value="AWS">AWS</option>
            <option value="Figma">Figma</option>
            <option value="Go">Go</option>
            <option value="Swift">Swift</option>
          </select>
        </div>
      </div>

      {/* Active filters indicator */}
      {hasActiveFilters && (
        <div className="mt-3 flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {locationFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                Location: {locationFilter}
              </span>
            )}
            {typeFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                Type: {typeFilter}
              </span>
            )}
            {tagFilter && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                Skill: {tagFilter}
              </span>
            )}
          </div>
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
