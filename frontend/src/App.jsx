import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import MyApplications from './pages/MyApplications';

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected: any logged-in user */}
                    <Route path="/jobs" element={
                        <ProtectedRoute>
                            <Jobs />
                        </ProtectedRoute>
                    } />
                    <Route path="/my-applications" element={
                        <ProtectedRoute>
                            <MyApplications />
                        </ProtectedRoute>
                    } />

                    {/* Protected: admin only */}
                    <Route path="/admin" element={
                        <ProtectedRoute adminOnly>
                            <Admin />
                        </ProtectedRoute>
                    } />

                    {/* Fallback */}
                    <Route path="*" element={<Home />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
