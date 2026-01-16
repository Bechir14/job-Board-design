import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { JobProvider } from "./context/JobContext";
import { Home } from "./pages/Home";
import { JobDetails } from "./pages/JobDetails";
import { CompanyProfile } from "./pages/CompanyProfile";
import { SavedJobs } from "./pages/SavedJobs";
import { PostJob } from "./pages/PostJob";
import { UserProfile } from "./pages/UserProfile";
import { Navigation } from "./components/Navigation";

export default function App() {
  return (
    <Router>
      <JobProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/company/:id" element={<CompanyProfile />} />
            <Route path="/saved" element={<SavedJobs />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </div>
      </JobProvider>
    </Router>
  );
}
