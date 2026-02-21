import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Wraps any route that requires authentication
// adminOnly prop restricts access to admin role
export default function ProtectedRoute({ children, adminOnly = false }) {
    const { user, loading } = useAuth();

    if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Loading...</p>;

    if (!user) return <Navigate to="/login" replace />;

    if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;

    return children;
}
