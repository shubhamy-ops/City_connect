import React, { useState } from 'react';
import { useIssues } from '../context/IssueContext';
import { MapView } from '../components/MapView';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { 
  MapPin, PlusCircle, LayoutDashboard, ShieldCheck, CheckCircle2, 
  Clock, AlertTriangle, ArrowRight, Zap, Users, Activity,
  MessageSquare, Globe, Sparkles, Wrench, Building2, Flame,
  Bot, Filter, Check, Eye, Search, Layers, RefreshCw, FileText,
  BarChart3, TrendingUp, PieChart, CheckCircle
} from 'lucide-react';

export const LandingPage = () => {
  const { setActivePage, stats, issues, navigateToDetail } = useIssues();
  const [activeTab, setActiveTab] = useState('All');

  const filteredPreviewIssues = activeTab === 'All' 
    ? issues 
    : issues.filter(i => i.status === activeTab);

  // Mock weekly resolution chart data
  const chartDays = [
    { day: 'Mon', count: 18, height: '60%' },
    { day: 'Tue', count: 24, height: '80%' },
    { day: 'Wed', count: 32, height: '100%' },
    { day: 'Thu', count: 28, height: '85%' },
    { day: 'Fri', count: 35, height: '95%' },
    { day: 'Sat', count: 15, height: '50%' },
    { day: 'Sun', count: 12, height: '40%' }
  ];

  return (
    <div className="space-y-28 pb-24">
      
      {/* 1. HERO SECTION WITH FLOATING MOCKUP & LIVE ANIMATED PINS */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-gradient-to-b from-blue-50/60 via-[#F8FAFC] to-[#F8FAFC]">
        {/* Soft Ambient Blend Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[280px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-xs text-xs font-heading font-semibold text-deepblue-900">
                <span className="w-2 h-2 rounded-full bg-brandorange-500 pin-pulse"></span>
                <span>Smart Civic Reporting & Accountability SaaS</span>
              </div>

              {/* Big Heading */}
              <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-deepblue-900 leading-[1.12]">
                Fix Your City. <br />
                <span className="bg-gradient-to-r from-brandorange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                  One Report at a Time.
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal mx-auto lg:mx-0">
                Report civic issues, track progress, and ensure accountability. CityConnect bridges citizens and authorities with real-time tracking from dispatch to resolution.
              </p>

              {/* CTAs with hover scale micro-interactions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActivePage('report')}
                  className="w-full sm:w-auto stripe-btn-primary px-8 py-4 text-xs font-heading font-bold shadow-lg"
                >
                  <PlusCircle className="w-5 h-5 text-white" />
                  <span>Report Issue</span>
                </button>

                <button
                  onClick={() => setActivePage('dashboard')}
                  className="w-full sm:w-auto stripe-btn-secondary px-8 py-4 text-xs font-heading font-bold shadow-lg"
                >
                  <LayoutDashboard className="w-5 h-5 text-brandorange-500" />
                  <span>Track Issues</span>
                </button>
              </div>

              {/* Trust Metrics */}
              <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div>
                  <p className="text-2xl font-heading font-extrabold text-deepblue-900">3,400+</p>
                  <p className="text-xs text-slate-500 font-medium">Issues Fixed</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-extrabold text-brandorange-500">{stats.resolutionRate || 80}%</p>
                  <p className="text-xs text-slate-500 font-medium">Success Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-extrabold text-deepblue-900">24-48h</p>
                  <p className="text-xs text-slate-500 font-medium">Avg Turnaround</p>
                </div>
              </div>

            </div>

            {/* Right Floating SaaS UI Mockup with Live Pins (5 cols) */}
            <div className="lg:col-span-5 relative">
              
              {/* Floating UI Card container */}
              <div className="stripe-glass-card p-4 shadow-2xl relative z-10 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                
                {/* Floating Top Header bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-slate-200/80 mb-3 bg-white/60 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-heading font-bold text-deepblue-900">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Live Incident Dispatch Stream</span>
                  </div>
                </div>

                {/* Leaflet Map Preview */}
                <MapView
                  issues={issues}
                  onSelectIssue={navigateToDetail}
                  height="300px"
                />

                {/* Floating Micro Status Pill Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl flex items-center justify-between z-20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-brandorange-500 flex items-center justify-center font-bold">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-heading font-bold text-deepblue-900">Main St Pothole Repair</p>
                      <p className="text-[11px] text-emerald-600 font-medium">Crew Dispatched • 18m ago</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-heading font-bold">
                    In Progress
                  </span>
                </div>

              </div>

              {/* Decorative Background Card Shadow Offset */}
              <div className="absolute -bottom-4 -right-4 inset-0 bg-gradient-to-tr from-deepblue-900 to-brandorange-500 opacity-20 rounded-2xl blur-xl pointer-events-none" />

            </div>

          </div>
        </div>
      </section>

      {/* 2. PROBLEM SECTION (ASYMMETRIC GRID WITH VARYING TINTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-brandorange-500 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
            Real-World Pain Points
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-deepblue-900">
            The Problems Citizens Face Every Day
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Traditional municipal channels leave residents in the dark with slow response times and no accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="stripe-glass-card p-6 space-y-4 hover:border-rose-300">
            <div className="icon-badge-orange bg-rose-50 text-rose-600 border-rose-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">Potholes Remain Unrepaired</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dangerous pavement cracks damage tires and create severe traffic hazards without scheduled repair timelines.
            </p>
          </div>

          <div className="stripe-glass-card p-6 space-y-4 hover:border-amber-300">
            <div className="icon-badge-orange bg-amber-50 text-amber-600 border-amber-200">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">Garbage Complaints Ignored</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Overflowing waste bins attract pests and spill onto walkways due to lack of real-time overflow alerts.
            </p>
          </div>

          <div className="stripe-glass-card p-6 space-y-4 hover:border-blue-300">
            <div className="icon-badge-blue bg-blue-50 text-deepblue-900 border-blue-200">
              <Zap className="w-5 h-5 text-brandorange-500" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">Broken Streetlights Unresolved</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlit street lamps create dark hazards for pedestrians, remaining unaddressed for weeks at a time.
            </p>
          </div>

          <div className="stripe-glass-card p-6 space-y-4 hover:border-violet-300">
            <div className="icon-badge-emerald bg-violet-50 text-violet-600 border-violet-200">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">No Way to Track Complaints</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Paper tickets provide zero ticket ID tracking, field crew updates, or photographic proof of completion.
            </p>
          </div>

        </div>
      </section>

      {/* 3. SOLUTION FLOW (HORIZONTAL CORE UX WITH CONNECTORS) */}
      <section className="bg-[#F1F5F9] py-20 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-deepblue-900 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs">
              Solution Flow & Core UX
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-deepblue-900">
              How CityConnect Resolves Issues Step-by-Step
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              A 6-step lifecycle architecture maintaining complete transparency from initial photo to resident verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {[
              { step: "01", title: "Report Issue", desc: "Upload photo + description & location.", icon: PlusCircle },
              { step: "02", title: "AI Detects Issue", desc: "Auto categorization & priority score.", icon: Bot },
              { step: "03", title: "Assign Authority", desc: "Auto-routed to municipal department.", icon: Building2 },
              { step: "04", title: "Real-Time Tracking", desc: "Monitor crew status & SLA timers.", icon: Clock },
              { step: "05", title: "Issue Resolved", desc: "Crews complete fix & upload proof.", icon: Wrench },
              { step: "06", title: "Citizen Verifies", desc: "Resident inspects & closes ticket.", icon: CheckCircle2 }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="stripe-glass-card p-5 space-y-3 relative group hover:border-brandorange-500 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="w-7 h-7 rounded-full bg-deepblue-900 text-white font-heading font-bold text-xs flex items-center justify-center">
                        {item.step}
                      </span>
                      <div className="p-2 rounded-[10px] bg-orange-50 text-brandorange-500">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-heading font-bold text-deepblue-900 text-xs sm:text-sm mb-1">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>

                  {idx < 5 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-slate-300 group-hover:text-brandorange-500 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. FEATURES SECTION (GRID WITH DUAL-TONE BADGES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-brandorange-500 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-deepblue-900">
            Built for High-Impact Civic Operations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="stripe-glass-card p-6 space-y-4">
            <div className="icon-badge-orange">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">AI Issue Detection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload photos of potholes, waste, or electrical damage. Machine vision auto-categorizes issue severity and routes tickets instantly.
            </p>
          </div>

          <div className="stripe-glass-card p-6 space-y-4">
            <div className="icon-badge-blue">
              <MapPin className="w-5 h-5 text-brandorange-500" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">Smart Map Integration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Interactive Leaflet maps with location-based markers. Citizens and authority dispatchers pin exact geolocations with landmark addresses.
            </p>
          </div>

          <div className="stripe-glass-card p-6 space-y-4">
            <div className="icon-badge-emerald">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">Real-Time Tracking Dashboard</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Track status stages from Reported to Verified. Residents receive instant timeline notifications as field crews work on-site.
            </p>
          </div>

          <div className="stripe-glass-card p-6 space-y-4">
            <div className="icon-badge-orange">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">Automatic SLA Escalation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict Service Level Agreement timers ensure tickets don't sit stagnant. Overdue complaints auto-escalate to senior department heads.
            </p>
          </div>

          <div className="stripe-glass-card p-6 space-y-4">
            <div className="icon-badge-blue">
              <RefreshCw className="w-5 h-5 text-deepblue-900" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">Duplicate Issue Detection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Geospatial algorithms scan 300m radiuses for matching active reports, prompting users to upvote existing pins instead of creating duplicates.
            </p>
          </div>

          <div className="stripe-glass-card p-6 space-y-4">
            <div className="icon-badge-emerald">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">Citizen Verification Channel</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Before/after photo comparison slider allows reporting citizens to inspect completed work before officially closing tickets.
            </p>
          </div>

        </div>
      </section>

      {/* 5. REALISTIC SAAS DASHBOARD PREVIEW WITH RESOLUTION CHARTS (IMPORTANT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-deepblue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Real Product Interface
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-deepblue-900">
            Enterprise Operational SaaS Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Experience the real-time operational interface used by municipal dispatchers and citizens.
          </p>
        </div>

        {/* Realistic High-Fidelity Product UI Container */}
        <div className="stripe-glass-card p-6 sm:p-8 bg-white border border-slate-200 shadow-2xl space-y-8">
          
          {/* Top Operational Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono font-bold text-brandorange-500">MUNICIPAL COMMAND CENTER v2.4</span>
              <h3 className="text-xl font-heading font-extrabold text-deepblue-900">City Operations Dispatch Matrix</h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-heading font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>All Crew Dispatch Units Active</span>
              </div>
            </div>
          </div>

          {/* SaaS Analytics Grid (Charts + Metrics) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Resolution Rate Bar Chart (7 cols) */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-heading font-bold text-sm text-deepblue-900 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-brandorange-500" />
                    <span>Weekly Resolution Throughput</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">Resolved tickets per day across all municipal departments</p>
                </div>
                <span className="text-xs font-heading font-bold text-emerald-600 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4%
                </span>
              </div>

              {/* Bar Chart Bars */}
              <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
                {chartDays.map((bar, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div className="text-[10px] font-mono font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {bar.count}
                    </div>
                    <div 
                      style={{ height: bar.height }} 
                      className="w-full bg-gradient-to-t from-deepblue-900 to-brandorange-500 rounded-t-lg group-hover:brightness-110 transition-all duration-300 shadow-xs"
                    />
                    <span className="text-[11px] font-heading font-semibold text-slate-600">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Metrics & Category Breakdown (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Active Pending Issues</p>
                  <p className="text-2xl font-heading font-extrabold text-brandorange-500">1 Unassigned</p>
                </div>
                <span className="p-2.5 rounded-xl bg-orange-100 text-brandorange-600">⏳</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Work Orders In Progress</p>
                  <p className="text-2xl font-heading font-extrabold text-deepblue-900">2 Dispatched</p>
                </div>
                <span className="p-2.5 rounded-xl bg-blue-100 text-deepblue-900">🛠️</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">SLA Verified Closures</p>
                  <p className="text-2xl font-heading font-extrabold text-emerald-600">2 Verified</p>
                </div>
                <span className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600">✅</span>
              </div>

            </div>

          </div>

          {/* Table Preview */}
          <div className="space-y-4 pt-2 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h4 className="font-heading font-bold text-xs text-deepblue-900 uppercase tracking-wider">
                Live Incident Complaint Log
              </h4>
              
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {['All', 'Reported', 'In Progress', 'Fixed'].map(st => (
                  <button
                    key={st}
                    onClick={() => setActiveTab(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold transition-all ${
                      activeTab === st 
                        ? 'bg-deepblue-900 text-white shadow-xs' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-600 font-heading font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Ticket ID</th>
                    <th className="py-3.5 px-4">Issue Description</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Priority</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {filteredPreviewIssues.slice(0, 4).map(issue => (
                    <tr key={issue.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-deepblue-900">{issue.id}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{issue.title}</td>
                      <td className="py-3.5 px-4 text-slate-500">{issue.category}</td>
                      <td className="py-3.5 px-4"><PriorityBadge priority={issue.priority} size="sm" /></td>
                      <td className="py-3.5 px-4"><StatusBadge status={issue.status} size="sm" /></td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => navigateToDetail(issue.id)}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-deepblue-900 font-heading font-semibold text-[11px] rounded-lg transition-colors"
                        >
                          View Log
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 6. IMPACT SECTION (3-COLUMN PROVEN BENEFITS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-brandorange-500 bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
            Proven Civic Impact
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-deepblue-900">
            Delivering Value Across Every Stakeholder
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="stripe-glass-card p-7 space-y-4 border-t-4 border-t-brandorange-500">
            <div className="icon-badge-orange">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-deepblue-900 text-xl">For Citizens</h3>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="text-brandorange-500 font-bold">✓</span>
                <span>30-second mobile incident reporting with auto geotagging.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-brandorange-500 font-bold">✓</span>
                <span>Complete transparency with SMS & dashboard timeline tracking.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-brandorange-500 font-bold">✓</span>
                <span>Power to verify completion before ticket archive.</span>
              </li>
            </ul>
          </div>

          <div className="stripe-glass-card p-7 space-y-4 border-t-4 border-t-deepblue-900">
            <div className="icon-badge-blue">
              <Building2 className="w-6 h-6 text-deepblue-900" />
            </div>
            <h3 className="font-heading font-extrabold text-deepblue-900 text-xl">For Government</h3>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="text-deepblue-900 font-bold">✓</span>
                <span>Centralized command center for multi-department dispatch.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-deepblue-900 font-bold">✓</span>
                <span>70% reduction in municipal call center overload.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-deepblue-900 font-bold">✓</span>
                <span>Data analytics on crew response times and SLA metrics.</span>
              </li>
            </ul>
          </div>

          <div className="stripe-glass-card p-7 space-y-4 border-t-4 border-t-emerald-500">
            <div className="icon-badge-emerald">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-extrabold text-deepblue-900 text-xl">For Community</h3>
            <ul className="space-y-3 text-xs text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Cleaner, safer streets and well-maintained public infrastructure.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Increased trust between residents and city authorities.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Community priority upvoting for urgent public hazards.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 7. FUTURE SCOPE (UPCOMING ROADMAP CARDS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-deepblue-900 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Roadmap & Innovation
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-deepblue-900">
            Upcoming Future Scope Features
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="stripe-glass-card p-6 space-y-3">
            <div className="icon-badge-orange">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">AI Severity Detection</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated computer vision predicting hazard damage costs and repair urgency.
            </p>
          </div>

          <div className="stripe-glass-card p-6 space-y-3">
            <div className="icon-badge-blue">
              <Wrench className="w-5 h-5 text-brandorange-500" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">Predictive Maintenance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Machine learning forecasting pipe bursts and road cracks before they occur.
            </p>
          </div>

          <div className="stripe-glass-card p-6 space-y-3">
            <div className="icon-badge-emerald">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">IoT Integration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connected streetlights and smart bin sensors auto-logging service tickets.
            </p>
          </div>

          <div className="stripe-glass-card p-6 space-y-3">
            <div className="icon-badge-orange bg-violet-50 text-violet-600 border-violet-200">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-deepblue-900 text-base">WhatsApp / Chatbot</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Report issues directly on WhatsApp or Telegram by sending a photo and GPS pin.
            </p>
          </div>

        </div>
      </section>

      {/* 8. FINAL CTA (HIGH CONTRAST GRADIENT BANNER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-deepblue-900 via-indigo-900 to-deepblue-950 rounded-[28px] p-10 sm:p-14 text-center text-white space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brandorange-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-heading font-extrabold tracking-tight">
              Start Reporting Issues Today
            </h2>
            <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
              Join thousands of proactive citizens and city officials making municipal infrastructure cleaner, safer, and accountable.
            </p>
          </div>

          <div className="pt-2 relative z-10 flex items-center justify-center">
            <button
              onClick={() => setActivePage('report')}
              className="stripe-btn-primary px-9 py-4 text-xs sm:text-sm font-heading font-bold shadow-xl"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
