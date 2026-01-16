import { createContext, useContext, useState, ReactNode } from 'react';
import { mockJobs, mockCompanies } from '../data/mockData';

interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  type: string;
  tags: string[];
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
}

interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
  size: string;
  description: string;
  culture: string[];
  website: string;
  location: string;
}

interface JobContextType {
  jobs: Job[];
  companies: Company[];
  savedJobs: string[];
  toggleSaveJob: (jobId: string) => void;
  isSaved: (jobId: string) => boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  locationFilter: string;
  setLocationFilter: (location: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  tagFilter: string;
  setTagFilter: (tag: string) => void;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const toggleSaveJob = (jobId: string) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const isSaved = (jobId: string) => savedJobs.includes(jobId);

  return (
    <JobContext.Provider value={{
      jobs: mockJobs,
      companies: mockCompanies,
      savedJobs,
      toggleSaveJob,
      isSaved,
      searchQuery,
      setSearchQuery,
      locationFilter,
      setLocationFilter,
      typeFilter,
      setTypeFilter,
      tagFilter,
      setTagFilter,
    }}>
      {children}
    </JobContext.Provider>
  );
}

export function useJobContext() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within JobProvider');
  }
  return context;
}
