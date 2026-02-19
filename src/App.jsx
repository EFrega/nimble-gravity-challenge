import { useState, useEffect } from 'react';
import { apiService } from './services/apiService';
import JobItem from './components/JobItem';

const USER_EMAIL = 'efrega77@gmail.com';

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [candidateData, jobsData] = await Promise.all([
          apiService.getCandidateByEmail(USER_EMAIL),
          apiService.getJobList()
        ]);
        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="dashboard">
      <header>
        <h1>Nimble Gravity Challenge</h1>
        <p>Candidate Portal</p>
      </header>

      {error && (
        <div className="status-message status-error" style={{ marginBottom: '1rem' }}>
          Error: {error}
        </div>
      )}

      {loading ? (
        <div className="candidate-card skeleton" style={{ height: '300px' }}></div>
      ) : (
        <>
          <section className="candidate-card">
            <h2>Candidate Information</h2>
            <p><strong>Name:</strong> {candidate?.firstName} {candidate?.lastName}</p>
            <p><strong>Email:</strong> {candidate?.email}</p>
            <p><strong>ID:</strong> {candidate?.candidateId}</p>
          </section>

          <section>
            <h2 style={{ marginBottom: '1.5rem' }}>Available Positions</h2>
            <div className="job-list">
              {jobs.map(job => (
                <JobItem key={job.id} job={job} candidate={candidate} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default App;
