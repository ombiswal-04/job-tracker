import { useState, useEffect } from 'react';
import API from '../api/api';

const STATUS_STYLE = {
    applied: { background: '#dbeafe', color: '#1e40af' },
    interview: { background: '#fef3c7', color: '#92400e' },
    accepted: { background: '#d1fae5', color: '#065f46' },
    rejected: { background: '#fee2e2', color: '#991b1b' },
};

export default function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/applications/mine')
            .then(res => setApplications(res.data))
            .catch(err => console.error('Failed to load applications:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="page-center">Loading your applications...</div>;

    return (
        <main className="container">
            <div className="page-header">
                <h1>My Applications</h1>
                <p className="page-subtitle">Track all your job applications below</p>
            </div>

            {applications.length === 0 && (
                <p className="empty-state">
                    You haven't applied to any jobs yet. <a href="/jobs">Browse Jobs →</a>
                </p>
            )}

            <div className="jobs-list">
                {applications.map(app => (
                    <div key={app._id} className="job-card">
                        <div className="job-card-info">
                            <h3>{app.job?.title ?? 'Job no longer available'}</h3>
                            <p className="job-company">
                                {app.job?.company} &mdash; {app.job?.location}
                            </p>
                            <p className="job-meta">
                                Applied on: {new Date(app.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric', month: 'short', year: 'numeric'
                                })}
                            </p>
                        </div>

                        <div className="job-card-action">
                            <span
                                className="badge"
                                style={STATUS_STYLE[app.status] || { background: '#f1f5f9', color: '#475569' }}
                            >
                                {app.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
