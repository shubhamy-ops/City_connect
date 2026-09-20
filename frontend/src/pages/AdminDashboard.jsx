import React, { useState } from 'react';
import { useIssues } from '../context/IssueContext';
import { MapView } from '../components/MapView';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { 
  ShieldCheck, AlertTriangle, Clock, CheckCircle2, UserCheck, 
  MapPin, Flame, Upload, Sparkles, Filter, ExternalLink, RefreshCw 
} from 'lucide-react';

const DEPARTMENTS = [
  'Department of Public Works',
  'Sanitation & Waste Management',
  'Electrical Grid & Utilities',
  'Municipal Water Authority',
  'Urban Forestry & Parks',
  'Civic Safety & Rapid Response'
];

export const AdminDashboard = () => {
  const { issues, stats, updateIssueStatus, navigateToDetail } = useIssues();

  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  
  // Resolution photo modal state
  const [fixingIssueId, setFixingIssueId] = useState(null);
  const [resolutionPhoto, setResolutionPhoto] = useState(
    'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=800&q=80'
  );
  const [resolutionNote, setResolutionNote] = useState('');

  // Filter issues for table
  const displayedIssues = issues.filter(issue => {
    if (selectedDeptFilter !== 'All' && issue.assignedDepartment !== selectedDeptFilter) return false;
    if (selectedStatusFilter !== 'All' && issue.status !== selectedStatusFilter) return false;
    return true;
  });

  const handleFixSubmit = (e) => {
    e.preventDefault();
    if (!fixingIssueId) return;
    updateIssueStatus(
      fixingIssueId,
      'Fixed',
      null,
      null,
      resolutionNote || 'Crews completed repair work. Verification photos attached.',
      resolutionPhoto
    );
    setFixingIssueId(null);
    setResolutionNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Command Center Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/40 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Authority Command Center & Dispatch Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Municipal Dispatch Console</h1>
          <p className="text-xs text-slate-400">Manage department work orders, monitor SLA timers, and assign field crews.</p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-300 bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>System Status: ALL DISPATCH CREWS OPERATIONAL</span>
        </div>
      </div>

      {/* Analytics Command Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Total Reported</span>
            <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">📊</span>
          </div>
          <p className="text-3xl font-black text-white">{stats.total || issues.length}</p>
          <p className="text-[11px] text-sky-400">Logged via CityConnect</p>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Resolution Rate</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">⚡</span>
          </div>
          <p className="text-3xl font-black text-emerald-400">{stats.resolutionRate || 80}%</p>
          <p className="text-[11px] text-emerald-400">SLA Verified Closures</p>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>SLA Breach Risk</span>
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">⚠️</span>
          </div>
          <p className="text-3xl font-black text-rose-400">{stats.overdueCount || 1}</p>
          <p className="text-[11px] text-rose-400">Urgent Escalation Required</p>
        </div>

        <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Avg Field Turnaround</span>
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">⏱️</span>
          </div>
          <p className="text-3xl font-black text-amber-400">28.4 Hours</p>
          <p className="text-[11px] text-amber-400">-14% faster than target</p>
        </div>
      </div>

      {/* Interactive Command Map */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-sky-400" />
            <span>City Infrastructure Incident Map</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">Color-coded pin status dispatch view</span>
        </div>

        <MapView
          issues={displayedIssues}
          onSelectIssue={navigateToDetail}
          height="420px"
        />
      </div>

      {/* Incident Dispatch & Work Orders Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        
        {/* Table Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="text-base font-bold text-slate-100">Municipal Work Order Queue</h3>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Dept Filter */}
            <select
              value={selectedDeptFilter}
              onChange={e => setSelectedDeptFilter(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatusFilter}
              onChange={e => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Reported">Reported</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Fixed">Fixed</option>
              <option value="Verified">Verified</option>
            </select>
          </div>
        </div>

        {/* Complaints Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-semibold border-b border-slate-800 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Incident & Location</th>
                <th className="py-3 px-4">Priority & SLA</th>
                <th className="py-3 px-4">Assigned Department</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Dispatch Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {displayedIssues.map(issue => {
                const isOverdue = new Date(issue.slaDueDate) < new Date() && issue.status !== 'Fixed' && issue.status !== 'Verified';

                return (
                  <tr key={issue.id} className="hover:bg-slate-900/50 transition-colors">
                    
                    {/* Ticket ID */}
                    <td className="py-4 px-4 font-mono font-bold text-sky-400">
                      {issue.id}
                    </td>

                    {/* Incident & Location */}
                    <td className="py-4 px-4 max-w-xs space-y-1">
                      <p 
                        onClick={() => navigateToDetail(issue.id)}
                        className="font-bold text-slate-100 hover:text-sky-300 cursor-pointer line-clamp-1"
                      >
                        {issue.title}
                      </p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                        <span>{issue.location?.address}</span>
                      </p>
                    </td>

                    {/* Priority & SLA */}
                    <td className="py-4 px-4 space-y-1">
                      <PriorityBadge priority={issue.priority} size="sm" />
                      {isOverdue && (
                        <div className="text-[10px] font-bold text-rose-400 flex items-center gap-1 animate-pulse">
                          <AlertTriangle className="w-3 h-3" />
                          <span>SLA BREACHED</span>
                        </div>
                      )}
                    </td>

                    {/* Assigned Dept Dropdown */}
                    <td className="py-4 px-4">
                      <select
                        value={issue.assignedDepartment || DEPARTMENTS[0]}
                        onChange={(e) => updateIssueStatus(issue.id, null, e.target.value, null, `Department reassigned to ${e.target.value}`)}
                        className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 font-medium focus:outline-none focus:border-violet-500"
                      >
                        {DEPARTMENTS.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </td>

                    {/* Current Status Dropdown */}
                    <td className="py-4 px-4">
                      <select
                        value={issue.status}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'Fixed') {
                            setFixingIssueId(issue.id);
                          } else {
                            updateIssueStatus(issue.id, val);
                          }
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${
                          issue.status === 'Fixed' || issue.status === 'Verified'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : issue.status === 'In Progress'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-slate-900 text-sky-400 border-slate-800'
                        }`}
                      >
                        <option value="Reported">Reported</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Fixed">Fixed (Upload Proof)</option>
                        <option value="Verified">Verified</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => navigateToDetail(issue.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="View Full Audit Log"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Resolution Photo Upload Modal */}
      {fixingIssueId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <form onSubmit={handleFixSubmit} className="glass-panel max-w-md w-full rounded-3xl p-6 border border-emerald-500/40 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Attach Resolution Proof</h3>
                <p className="text-xs text-slate-400">Upload completion photo for ticket {fixingIssueId}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">After-Photo URL / Base64</label>
              <input
                type="text"
                value={resolutionPhoto}
                onChange={e => setResolutionPhoto(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
                required
              />
            </div>

            <div className="h-40 rounded-xl overflow-hidden border border-slate-800 bg-slate-900">
              <img src={resolutionPhoto} alt="After repair preview" className="w-full h-full object-cover" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Completion Note / Crew Log</label>
              <textarea
                rows={2}
                value={resolutionNote}
                onChange={e => setResolutionNote(e.target.value)}
                placeholder="e.g. Hot mix asphalt poured and compacted by DPW Crew #4."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFixingIssueId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20"
              >
                Save Resolution & Mark Fixed
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

