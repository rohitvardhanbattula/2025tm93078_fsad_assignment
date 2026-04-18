import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation(); // Hook to get the current URL path

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" />
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">Campus Hub</h1>
            <div className="flex gap-4 items-center">
              {!isAuthenticated ? (
                <>
                  {location.pathname !== '/login' && (
                    <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition">Login</Link>
                  )}
                  {location.pathname !== '/register' && (
                    <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm">Register</Link>
                  )}
                </>
              ) : (
                <>
                  {/* Only show the Dashboard link if the user is NOT currently on the Dashboard */}
                  {location.pathname !== '/dashboard' && (
                    <Link to="/dashboard" className="text-slate-600 hover:text-indigo-600 font-medium transition">Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition border border-transparent hover:border-red-100">Logout</button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;