import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axiosConfig';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            toast.success('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            toast.error('Registration failed. Email might already exist.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-sm border border-slate-100 animate-fade-in">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Join Campus Hub</h2>
            <p className="text-slate-500 text-center mb-6 text-sm">Create an account to start booking or hosting gigs.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                    <input type="text" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" placeholder="you@wilp.bits-pilani.ac.in" onChange={e => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                    <input type="password" placeholder="••••••••" onChange={e => setFormData({...formData, password: e.target.value})} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                    <select onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition bg-white">
                        <option value="STUDENT">Student</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition shadow-sm mt-2">Create Account</button>
            </form>
            
            <p className="mt-6 text-center text-sm text-slate-600">
                Already have an account? <Link to="/login" className="text-indigo-600 hover:underline font-medium">Log in</Link>
            </p>
        </div>
    );
};

export default Register;