import React, { useState } from 'react';
import { useIssues } from '../context/IssueContext';
import { X, ShieldCheck, UserCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, activeRole, setActiveRole, setCurrentUser, addToast } = useIssues();
  const [email, setEmail] = useState('alex.rivera@civicnet.org');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState(activeRole);

  if (!authModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setActiveRole(selectedRole);
    if (selectedRole === 'admin') {
      setCurrentUser({
        id: 'admin-101',
        name: 'Supervisor Chief Miller',
        email: 'miller@citygov.org',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
      });
      addToast("Signed In", "Welcome to City Operations Command Center", "info");
    } else {
      setCurrentUser({
        id: 'user-77',
        name: 'Alex Rivera',
        email: 'alex.rivera@civicnet.org',
        role: 'citizen',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      });
      addToast("Signed In", "Welcome back, Alex!", "success");
    }
    setAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel max-w-md w-full rounded-3xl p-6 border border-slate-700/80 shadow-2xl relative">
        <button
          onClick={() => setAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 bg-slate-800/60 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto mb-3 border border-sky-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Sign In to CityConnect</h3>
          <p className="text-xs text-slate-400 mt-1">Select your user portal role to continue</p>
        </div>

        {/* Role Toggle selector */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => setSelectedRole('citizen')}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              selectedRole === 'citizen'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Citizen User</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('admin')}
            className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              selectedRole === 'admin'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>City Official</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-sky-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all mt-2"
          >
            <span>Enter as {selectedRole === 'admin' ? 'City Official' : 'Resident'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

