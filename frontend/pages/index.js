import { useEffect, useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

// Base URL of backend API (matches backend port 5000)
const API_BASE = '/api';

export default function Home() {
  const [reports, setReports] = useState([]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchReports = async () => {
    try {
      const res = await axios.get(`${API_BASE}/reports`);
      setReports(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Backend connection failed. Ensure server is running on port 5000.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const submitReport = async (e) => {
    e.preventDefault();
    if (!location.trim() || !description.trim()) return;
    
    setSubmitting(true);
    setError('');
    try {
      await axios.post(`${API_BASE}/reports`, { location, description });
      setLocation('');
      setDescription('');
      await fetchReports();
    } catch (err) {
      setError('Failed to submit report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const displayed = reports.filter(r =>
    r.location.toLowerCase().includes(filter.toLowerCase()) ||
    r.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-red-500/30">
      <Head>
        <title>PulseCore | Rapid Crisis Response Dashboard</title>
        <meta name="description" content="Real-time crisis monitoring and reporting system for rapid response teams." />
      </Head>

      {/* Hero Background with animated pulse */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-red-900/10 blur-[120px] rounded-full opacity-50" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full opacity-30" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
              <span className="text-red-500 font-bold tracking-widest text-sm uppercase">Live System</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-500">
              PULSE<span className="text-red-600">CORE</span>
            </h1>
          </div>
          <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 rounded-2xl p-4 flex items-center gap-6 shadow-xl">
            <div className="text-center px-4 border-r border-neutral-800">
              <p className="text-neutral-500 text-xs uppercase font-bold mb-1">Active Nodes</p>
              <p className="text-xl font-mono">04</p>
            </div>
            <div className="text-center px-4 border-r border-neutral-800">
              <p className="text-neutral-500 text-xs uppercase font-bold mb-1">Total Reports</p>
              <p className="text-xl font-mono">{reports.length}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-neutral-500 text-xs uppercase font-bold mb-1">System Load</p>
              <p className="text-xl font-mono text-emerald-400">Normal</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar: Reporting Form */}
          <section className="lg:col-span-4 space-y-6">
            <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              </div>
              
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                Emergency Report
              </h2>
              
              <form onSubmit={submitReport} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Sector 7, Block B"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all placeholder:text-neutral-600"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-500 uppercase ml-1">Incident Details</label>
                  <textarea
                    placeholder="Describe the situation..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full bg-neutral-800/50 border border-neutral-700 rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-red-500/50 focus:border-red-500 outline-none transition-all placeholder:text-neutral-600 resize-none"
                    required
                  />
                </div>
                
                <button 
                  disabled={submitting}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {submitting ? 'Transmitting...' : 'Dispatch Report'}
                  {!submitting && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/></svg>}
                </button>
              </form>
              
              {error && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          </section>

          {/* Main Content: Reports Feed */}
          <section className="lg:col-span-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                Incident Feed
                <span className="text-sm font-normal text-neutral-500 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
                  {displayed.length} Records
                </span>
              </h2>
              
              <div className="relative group w-full md:w-64">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>
                <input
                  type="text"
                  placeholder="Search incidents..."
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-full py-2 pl-11 pr-4 focus:ring-1 focus:ring-neutral-700 focus:border-neutral-700 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-neutral-900/50 border border-neutral-800 rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : displayed.length === 0 ? (
              <div className="py-20 text-center bg-neutral-900/20 border border-dashed border-neutral-800 rounded-3xl">
                <p className="text-neutral-500 text-lg">No active incidents found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {displayed.map(r => (
                  <div 
                    key={r.id} 
                    className="group bg-neutral-900/40 backdrop-blur-sm border border-neutral-800/50 hover:border-neutral-700 p-6 rounded-3xl transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-neutral-800 flex items-center justify-center text-red-500">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-neutral-200">{r.location}</h3>
                          <p className="text-xs text-neutral-500 font-mono">{new Date(r.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-neutral-600 tracking-widest uppercase">ID: #{String(r.id).padStart(4, '0')}</span>
                    </div>
                    <p className="text-neutral-400 leading-relaxed pl-13">
                      {r.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="border-t border-neutral-900 py-12 mt-12 text-center relative z-10">
        <p className="text-neutral-600 text-xs font-bold tracking-[0.2em] uppercase">
          &copy; {new Date().getFullYear()} PulseCore Systems • Restricted Access
        </p>
      </footer>

      <style jsx global>{`
        body {
          background-color: #0a0a0a;
        }
        .pl-13 { padding-left: 3.25rem; }
      `}</style>
    </div>
  );
}
