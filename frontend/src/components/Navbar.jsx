import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">CareerSetu</Link>

            <div className="navbar-links">
                {/* Guest links */}
                {!user && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="btn btn-primary">Register</Link>
                    </>
                )}

                {/* Regular user links */}
                {user && user.role !== 'admin' && (
                    <>
                        <Link to="/jobs">Jobs</Link>
                        <Link to="/my-applications">My Applications</Link>
                    </>
                )}

                {/* Admin links */}
                {user && user.role === 'admin' && (
                    <Link to="/admin">Admin Dashboard</Link>
                )}

                {/* Auth actions */}
                {user && (
                    <>
                        <span className="navbar-user">Hi, {user.name}</span>
                        <button onClick={handleLogout} className="btn btn-outline">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
}
