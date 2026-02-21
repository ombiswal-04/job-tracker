import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { user } = useAuth();

    return (
        <main className="home">
            <div className="hero">
                <h1>Find Your Dream Job in India</h1>
                <p>CareerSetu connects Indian talent with the right opportunities. Browse live jobs and apply in one click.</p>
                <div className="hero-actions">
                    <Link to={user ? '/jobs' : '/register'} className="btn btn-primary btn-lg">
                        {user ? 'Browse Jobs' : 'Get Started'}
                    </Link>
                    {!user && (
                        <Link to="/login" className="btn btn-outline btn-lg">Login</Link>
                    )}
                </div>
                <div className="hero-stats">
                    <div className="stat">
                        <strong>500+</strong>
                        <span>Jobs Listed</span>
                    </div>
                    <div className="stat">
                        <strong>100+</strong>
                        <span>Companies</span>
                    </div>
                    <div className="stat">
                        <strong>10K+</strong>
                        <span>Job Seekers</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
