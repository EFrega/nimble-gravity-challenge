import { useState } from 'react';
import { apiService } from '../services/apiService';

export default function JobItem({ job, candidate }) {
    const [repoUrl, setRepoUrl] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!repoUrl) return;

        setStatus('loading');
        setErrorMessage('');

        try {
            const payload = {
                uuid: candidate.uuid,
                jobId: job.id,
                candidateId: candidate.candidateId,
                applicationId: candidate.applicationId,
                repoUrl: repoUrl
            };

            console.log('Sending Application Payload:', payload);

            const res = await apiService.applyToJob(payload);
            if (res.ok) {
                setStatus('success');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong');
        }
    };

    return (
        <div className="job-item">
            <h3>{job.title}</h3>

            <form onSubmit={handleSubmit} className="input-group">
                <label htmlFor={`repo-${job.id}`}>GitHub Repository URL</label>
                <input
                    id={`repo-${job.id}`}
                    type="url"
                    placeholder="https://github.com/user/repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    disabled={status === 'loading' || status === 'success'}
                    required
                />

                <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success' || !repoUrl}
                >
                    {status === 'loading' ? (
                        <div className="loading-spinner"></div>
                    ) : status === 'success' ? (
                        'Applied ✅'
                    ) : (
                        'Submit Application'
                    )}
                </button>
            </form>

            {status === 'success' && (
                <div className="status-message status-success">
                    Application sent successfully to Nimble!
                </div>
            )}

            {status === 'error' && (
                <div className="status-message status-error">
                    {errorMessage}
                </div>
            )}
        </div>
    );
}
