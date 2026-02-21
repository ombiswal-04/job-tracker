import { useState, useEffect } from 'react';
import API from '../api/api';

const EMPTY_FORM = {
    title: '', company: '', location: '', salary: '',
    jobType: 'Full-time', description: '', source: 'CareerSetu', applyUrl: ''
};

export default function Admin() {
    const [activeTab, setActiveTab] = useState('jobs');
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [form, setForm] = useState(EMPTY_FORM);
    const [editId, setEditId] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const fetchJobs = () => API.get('/jobs').then(r => setJobs(r.data));
    const fetchApps = () => API.get('/applications').then(r => setApplications(r.data));

    useEffect(() => {
        fetchJobs();
        fetchApps();
    }, []);

    // ── Job Form ────────────────────────────────────────────────────────────────
    const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editId) {
                await API.put(`/jobs/${editId}`, form);
            } else {
                await API.post('/jobs', form);
            }
            setForm(EMPTY_FORM);
            setEditId(null);
            fetchJobs();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to save job');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (job) => {
        setForm({
            title: job.title, company: job.company, location: job.location,
            salary: job.salary, jobType: job.jobType, description: job.description,
            source: job.source, applyUrl: job.applyUrl || ''
        });
        setEditId(job._id);
        setActiveTab('jobs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setForm(EMPTY_FORM);
        setEditId(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this job?')) return;
        try {
            await API.delete(`/jobs/${id}`);
            fetchJobs();
        } catch (err) {
            alert('Failed to delete job');
        }
    };

    // ── Application Status ──────────────────────────────────────────────────────
    const handleStatusUpdate = async (appId, status) => {
        try {
            await API.put(`/applications/${appId}/status`, { status });
            fetchApps();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    return (
        <main className="container">
            <div className="page-header">
                <h1>Admin Dashboard</h1>
                <p className="page-subtitle">Manage jobs and track applications</p>
            </div>

            {/* Tabs */}
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'jobs' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('jobs')}
                >
                    Jobs ({jobs.length})
                </button>
                <button
                    className={`tab ${activeTab === 'apps' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('apps')}
                >
                    Applications ({applications.length})
                </button>
            </div>

            {/* ── Jobs Tab ── */}
            {activeTab === 'jobs' && (
                <>
                    {/* Job Form */}
                    <section className="card" style={{ marginBottom: '2rem' }}>
                        <h2>{editId ? 'Edit Job' : 'Post a New Job'}</h2>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Job Title *</label>
                                <input name="title" placeholder="e.g. Senior React Developer" value={form.title} onChange={handleFormChange} required />
                            </div>
                            <div className="form-group">
                                <label>Company *</label>
                                <input name="company" placeholder="e.g. TechCorp India" value={form.company} onChange={handleFormChange} required />
                            </div>
                            <div className="form-group">
                                <label>Location *</label>
                                <input name="location" placeholder="e.g. Bengaluru / Remote" value={form.location} onChange={handleFormChange} required />
                            </div>
                            <div className="form-group">
                                <label>Salary *</label>
                                <input name="salary" placeholder="e.g. ₹12L - ₹18L" value={form.salary} onChange={handleFormChange} required />
                            </div>
                            <div className="form-group">
                                <label>Job Type *</label>
                                <select name="jobType" value={form.jobType} onChange={handleFormChange}>
                                    <option>Full-time</option>
                                    <option>Part-time</option>
                                    <option>Remote</option>
                                    <option>Contract</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Source</label>
                                <select name="source" value={form.source} onChange={handleFormChange}>
                                    <option>CareerSetu</option>
                                    <option>LinkedIn</option>
                                    <option>Indeed</option>
                                    <option>Naukri</option>
                                    <option>External</option>
                                </select>
                            </div>
                            {form.source !== 'CareerSetu' && (
                                <div className="form-group form-group-full">
                                    <label>External Apply URL</label>
                                    <input name="applyUrl" type="url" placeholder="https://..." value={form.applyUrl} onChange={handleFormChange} />
                                </div>
                            )}
                            <div className="form-group form-group-full">
                                <label>Description *</label>
                                <textarea name="description" rows={4} placeholder="Job requirements, responsibilities..." value={form.description} onChange={handleFormChange} required />
                            </div>
                            <div className="form-actions form-group-full">
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    {submitting ? 'Saving...' : editId ? 'Update Job' : 'Post Job'}
                                </button>
                                {editId && (
                                    <button type="button" className="btn btn-outline" onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </section>

                    {/* Jobs Table */}
                    <section>
                        <h2>All Jobs</h2>
                        {jobs.length === 0 ? <p className="empty-state">No jobs posted yet.</p> : (
                            <div className="table-wrap">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Company</th>
                                            <th>Type</th>
                                            <th>Source</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jobs.map(job => (
                                            <tr key={job._id}>
                                                <td><strong>{job.title}</strong></td>
                                                <td>{job.company}</td>
                                                <td>{job.jobType}</td>
                                                <td><span className="badge badge-source">{job.source}</span></td>
                                                <td>
                                                    <button className="btn btn-outline btn-sm" onClick={() => handleEdit(job)}>Edit</button>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </>
            )}

            {/* ── Applications Tab ── */}
            {activeTab === 'apps' && (
                <section>
                    <h2>All Applications</h2>
                    {applications.length === 0 ? <p className="empty-state">No applications yet.</p> : (
                        <div className="table-wrap">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Applicant</th>
                                        <th>Job</th>
                                        <th>Applied On</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map(app => (
                                        <tr key={app._id}>
                                            <td>
                                                <strong>{app.user?.name}</strong><br />
                                                <small>{app.user?.email}</small>
                                            </td>
                                            <td>
                                                <strong>{app.job?.title}</strong><br />
                                                <small>{app.job?.company}</small>
                                            </td>
                                            <td>{new Date(app.createdAt).toLocaleDateString('en-IN')}</td>
                                            <td>
                                                <select
                                                    value={app.status}
                                                    onChange={e => handleStatusUpdate(app._id, e.target.value)}
                                                    className="status-select"
                                                >
                                                    <option value="applied">applied</option>
                                                    <option value="interview">interview</option>
                                                    <option value="accepted">accepted</option>
                                                    <option value="rejected">rejected</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            )}
        </main>
    );
}
