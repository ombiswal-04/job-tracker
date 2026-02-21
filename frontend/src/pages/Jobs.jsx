import { useState, useEffect } from 'react';
import API from '../api/api';

export default function Jobs() {
    const [jobs, setJobs] = useState([]);
    const [appliedIds, setAppliedIds] = useState(new Set());
    const [loading, setLoading] = useState(true);
    const [applyingId, setApplyingId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobsRes, appsRes] = await Promise.all([
                    API.get('/jobs'),
                    API.get('/applications/mine')
                ]);
                setJobs(jobsRes.data);
                setAppliedIds(new Set(appsRes.data.map(app => app.job._id)));
            } catch (err) {
                console.error('Failed to load data:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleApply = async (jobId) => {
        setApplyingId(jobId);
        try {
            await API.post(`/applications/${jobId}`);
            setAppliedIds(prev => new Set([...prev, jobId]));
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to apply');
        } finally {
            setApplyingId(null);
        }
    };

    if (loading) return <div className="page-center">Loading jobs...</div>;

    return (
        <main className="container">
            <div className="page-header">
                <h1>Browse Jobs</h1>
                <p className="page-subtitle">{jobs.length} jobs available across India</p>
            </div>

            {jobs.length === 0 && (
                <p className="empty-state">No jobs listed yet. Check back soon!</p>
            )}

            <div className="jobs-list">
                {jobs.map(job => (
                    <div key={job._id} className="job-card">
                        <div className="job-card-info">
                            <div className="job-card-header">
                                <h3>{job.title}</h3>
                                <span className="badge badge-source">{job.source}</span>
                            </div>
                            <p className="job-company">{job.company} &mdash; {job.location}</p>
                            <p className="job-meta">{job.jobType} &bull; {job.salary}</p>
                            <p className="job-desc">{job.description.slice(0, 150)}{job.description.length > 150 ? '...' : ''}</p>
                        </div>

                        <div className="job-card-action">
                            {job.applyUrl ? (
                                <a
                                    href={job.applyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-outline"
                                >
                                    Apply External ↗
                                </a>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    disabled={appliedIds.has(job._id) || applyingId === job._id}
                                    onClick={() => handleApply(job._id)}
                                >
                                    {appliedIds.has(job._id) ? '✓ Applied' : applyingId === job._id ? 'Applying...' : 'Easy Apply'}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
