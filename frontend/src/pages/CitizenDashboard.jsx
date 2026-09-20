import React, { useState } from 'react';
import { useIssues } from '../context/IssueContext';
import { IssueCard } from '../components/IssueCard';
import { MapView } from '../components/MapView';
import { 
  Search, LayoutGrid, Map, PlusCircle, RefreshCw, Building2 
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Roads & Infrastructure',
  'Sanitation & Garbage',
  'Streetlights & Electrical',
  'Water & Drainage',
  'Parks & Trees',
  'Public Safety'
];

const STATUSES = ['All', 'Reported', 'Assigned', 'In Progress', 'Fixed', 'Verified'];

export const CitizenDashboard = () => {
  const { issues, setActivePage, navigateToDetail } = useIssues();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');

  const filteredIssues = issues.filter(issue => {
    if (selectedCategory !== 'All' && issue.category !== selectedCategory) return false;
    if (selectedStatus !== 'All' && issue.status !== selectedStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = issue.title?.toLowerCase().includes(q);
      const matchDesc = issue.description?.toLowerCase().includes(q);
      const matchId = issue.id?.toLowerCase().includes(q);
      const matchAddr = issue.location?.address?.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchId && !matchAddr) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'upvotes') return (b.upvotes || 0) - (a.upvotes || 0);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>Public Incident Tracker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Citizen Dashboard</h1>
          <p className="text-xs text-slate-400">Track active repair tickets and community reports across the city.</p>
        </div>

        <button
          onClick={() => setActivePage('report')}
          className="ui-btn-primary px-5 py-2.5 text-xs self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-emerald-200" />
          <span>Report New Incident</span>
        </button>
      </div>

      {/* Control Panel */}
      <div className="ui-card p-4 space-y-3.5">
        
        {/* Search & Mode Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reports by keyword, address, or ticket ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="ui-input pl-9"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="ui-input font-medium py-2 text-xs"
            >
              <option value="newest">Sort by Newest</option>
              <option value="upvotes">Sort by Upvotes</option>
            </select>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-xs font-medium flex items-center gap-1 transition-all ${
                  viewMode === 'grid' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded text-xs font-medium flex items-center gap-1 transition-all ${
                  viewMode === 'map' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1">Status:</span>
          {STATUSES.map(st => {
            const count = st === 'All' ? issues.length : issues.filter(i => i.status === st).length;
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-all border ${
                  isSelected 
                    ? 'bg-emerald-600 text-white border-emerald-500 font-semibold' 
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {st} <span className="text-[10px] opacity-75 font-mono">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-semibold text-slate-400 shrink-0 mr-1">Category:</span>
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 transition-all ${
                  isSelected 
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

      </div>

      {/* Main View Display */}
      {viewMode === 'map' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {filteredIssues.length} reported incident markers</span>
          </div>
          <MapView
            issues={filteredIssues}
            onSelectIssue={navigateToDetail}
            height="520px"
          />
        </div>
      ) : (
        <div>
          {filteredIssues.length === 0 ? (
            <div className="ui-card p-10 text-center space-y-3">
              <RefreshCw className="w-6 h-6 text-slate-600 mx-auto animate-spin" />
              <h3 className="text-sm font-bold text-slate-300">No reports found matching your criteria</h3>
              <p className="text-xs text-slate-500">Try adjusting your category filter or search query.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                }}
                className="px-3.5 py-1.5 bg-slate-800 text-xs font-medium text-emerald-400 rounded-lg hover:bg-slate-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredIssues.map(issue => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
