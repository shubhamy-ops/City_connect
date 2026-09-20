import React, { useState } from 'react';
import { useIssues } from '../context/IssueContext';
import { MapPin, PlusCircle, LayoutDashboard, ShieldCheck, User, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { activePage, setActivePage, activeRole, setActiveRole } = useIssues();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'dashboard', label: 'Public Dashboard', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'Authority View', icon: <ShieldCheck className="w-3.5 h-3.5 text-brandorange-500" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/92 border-b border-slate-200 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Brand Logo */}
        <div
          onClick={() => { setActivePage('landing'); setMobileOpen(false); }}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-deepblue-900 to-blue-700 text-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <MapPin className="w-4.5 h-4.5 text-brandorange-400 fill-current" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-lg text-deepblue-900 tracking-tight leading-none">
              City<span className="text-brandorange-500">Connect</span>
            </span>
            <p className="text-[9px] text-slate-500 font-medium leading-none mt-0.5">Smart Civic Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-0.5 bg-slate-100 p-1 rounded-[12px] border border-slate-200">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`px-3.5 py-1.5 rounded-[9px] text-xs font-heading font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                activePage === link.id
                  ? 'bg-white text-deepblue-900 shadow-sm'
                  : 'text-slate-500 hover:text-deepblue-900 hover:bg-white/70'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2">
          {/* Role Switcher */}
          <button
            onClick={() => setActiveRole(activeRole === 'citizen' ? 'admin' : 'citizen')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-heading font-semibold border transition-all duration-200 ${
              activeRole === 'admin'
                ? 'bg-deepblue-50 text-deepblue-900 border-deepblue-200 hover:bg-deepblue-100'
                : 'bg-orange-50 text-brandorange-600 border-orange-200 hover:bg-orange-100'
            }`}
          >
            {activeRole === 'admin'
              ? <><ShieldCheck className="w-3.5 h-3.5" /><span>Authority</span></>
              : <><User className="w-3.5 h-3.5" /><span>Citizen</span></>
            }
          </button>

          {/* Report CTA */}
          <button
            onClick={() => { setActivePage('report'); setMobileOpen(false); }}
            className="btn-primary px-4 py-2 text-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Report Issue</span>
            <span className="sm:hidden">Report</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-[10px] border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => { setActivePage(link.id); setMobileOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] text-sm font-heading font-semibold transition-all ${
                activePage === link.id
                  ? 'bg-deepblue-900 text-white'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setActiveRole(activeRole === 'citizen' ? 'admin' : 'citizen')}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-[10px] text-sm font-heading font-semibold text-brandorange-600 hover:bg-orange-50 transition-all"
            >
              {activeRole === 'admin' ? <ShieldCheck className="w-4 h-4" /> : <User className="w-4 h-4" />}
              <span>Switch to {activeRole === 'admin' ? 'Citizen' : 'Authority'} View</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
