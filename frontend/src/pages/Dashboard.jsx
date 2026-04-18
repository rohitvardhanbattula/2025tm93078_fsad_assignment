import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axiosConfig';

const Dashboard = () => {
    const [gigs, setGigs] = useState([]);
    const [newGig, setNewGig] = useState({ title: '', description: '', category: '', hourly_rate: '' });
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchGigs();
    }, []);

    const fetchGigs = async () => {
        try {
            const { data } = await api.get('/gigs');
            setGigs(data);
        } catch (error) {
            toast.error('Failed to fetch gigs');
        }
    };

    const handleCreateGig = async (e) => {
        e.preventDefault();
        try {
            await api.post('/gigs', { ...newGig, freelancer_id: user.id });
            toast.success('Gig published successfully!');
            fetchGigs();
            setNewGig({ title: '', description: '', category: '', hourly_rate: '' });
        } catch (error) {
            toast.error('Failed to create gig');
        }
    };

    const handleDeleteGig = async (gigId) => {
        try {
            await api.delete(`/gigs/${gigId}`);
            toast.success('Gig removed');
            fetchGigs();
        } catch (error) {
            toast.error('Failed to delete gig');
        }
    };

    const handleBook = async (gig) => {
        try {
            await api.post('/bookings', {
                gig_id: gig._id,
                client_id: user.id,
                freelancer_id: gig.freelancer_id,
                scheduled_date: new Date(Date.now() + 86400000).toISOString(),
                notes: 'Booking requested via dashboard'
            });
            toast.success(`Successfully booked ${gig.title}!`);
        } catch (error) {
            toast.error('Booking failed');
        }
    };

    const myGigs = gigs.filter(gig => gig.freelancer_id === user.id);
    const availableGigs = gigs.filter(gig => gig.freelancer_id !== user.id);

    return (
        <div className="animate-fade-in">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800">Welcome, {user?.name}</h2>
                <p className="text-slate-500 mt-1">Manage your gigs and discover new campus talent.</p>
            </header>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 mb-10">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Post a New Skill/Gig</h3>
                <form onSubmit={handleCreateGig} className="flex flex-col md:flex-row gap-4">
                    <input type="text" placeholder="Gig Title" value={newGig.title} onChange={e => setNewGig({...newGig, title: e.target.value})} required className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    <input type="text" placeholder="Short description..." value={newGig.description} onChange={e => setNewGig({...newGig, description: e.target.value})} required className="flex-2 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-auto" />
                    <input type="text" placeholder="Category" value={newGig.category} onChange={e => setNewGig({...newGig, category: e.target.value})} required className="w-full md:w-32 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    <div className="relative w-full md:w-32">
                        <span className="absolute left-3 top-2.5 text-slate-500">$</span>
                        <input type="number" placeholder="Rate/hr" value={newGig.hourly_rate} onChange={e => setNewGig({...newGig, hourly_rate: e.target.value})} required className="w-full pl-7 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <button type="submit" className="bg-indigo-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-indigo-700 transition whitespace-nowrap">Publish</button>
                </form>
            </div>

            {myGigs.length > 0 && (
                <div className="mb-10">
                    <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Your Postings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myGigs.map(gig => (
                            <div key={gig._id} className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full">{gig.category}</span>
                                    <span className="text-lg font-bold text-slate-700">${gig.hourly_rate}<span className="text-sm font-normal">/hr</span></span>
                                </div>
                                <h4 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{gig.title}</h4>
                                <p className="text-slate-600 text-sm flex-grow mb-6">{gig.description}</p>
                                <button onClick={() => handleDeleteGig(gig._id)} className="w-full bg-red-100 text-red-600 font-medium py-2.5 rounded-lg hover:bg-red-200 transition mt-auto">
                                    Delete Posting
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h3 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">Available Campus Gigs</h3>
            {availableGigs.length === 0 ? (
                <p className="text-slate-500">No other gigs available right now.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableGigs.map(gig => (
                        <div key={gig._id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition duration-200 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">{gig.category}</span>
                                <span className="text-lg font-bold text-emerald-600">${gig.hourly_rate}<span className="text-sm font-normal text-slate-500">/hr</span></span>
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{gig.title}</h4>
                            <p className="text-slate-600 text-sm flex-grow mb-6">{gig.description}</p>
                            <button onClick={() => handleBook(gig)} className="w-full bg-slate-900 text-white font-medium py-2.5 rounded-lg hover:bg-slate-800 transition mt-auto">
                                Book this Gig
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;