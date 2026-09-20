import React, { useState } from 'react';
import { useIssues } from '../context/IssueContext';
import { StatusBadge } from '../components/StatusBadge';
import { PriorityBadge } from '../components/PriorityBadge';
import { MapView } from '../components/MapView';
import { Timeline } from '../components/Timeline';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { 
  ArrowLeft, MapPin, ThumbsUp, ShieldCheck, CheckCircle2, 
  AlertCircle, Clock, User, Bot, MessageSquare, Send, Sparkles 
} from 'lucide-react';

export const IssueDetailPage = () => {
  const { 
    issues, 
    selectedIssueId, 
    setActivePage, 
    upvoteIssue, 
    verifyIssue, 
    currentUser,
    activeRole
  } = useIssues();

  const [feedbackNote, setFeedbackNote] = useState('');
  const [commentText, setCommentText] = useState('');

  const issue = issues.find(i => i.id === selectedIssueId) || issues[0];

  if (!issue) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-100">Issue Not Found</h2>
        <button
          onClick={() => setActivePage('dashboard')}
          className="px-4 py-2 bg-sky-500 text-white font-semibold text-xs rounded-xl"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isUpvoted = issue.upvotedBy?.includes(currentUser.id);
  const isFixedOrVerified = issue.status === 'Fixed' || issue.status === 'Verified';

  const handleVerifyAction = (action) => {
    verifyIssue(issue.id, action, feedbackNote);
    setFeedbackNote('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActivePage('dashboard')}
          className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" />
          <span>Back to Citizen Feed</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 text-sky-400 border border-slate-800">
            {issue.id}
          </span>
          <StatusBadge status={issue.status} size="lg" />
        </div>
      </div>

      {/* Main Issue Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
            {issue.category}
          </span>
          <PriorityBadge priority={issue.priority} size="md" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
          {issue.title}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {issue.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>{issue.location?.address}</span>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="flex items-center gap-1 font-medium">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Reported by {issue.reporter?.name || 'Resident'}</span>
            </span>
          </div>

          <button
            onClick={() => upvoteIssue(issue.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isUpvoted
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-lg'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${isUpvoted ? 'fill-sky-400 text-sky-400' : ''}`} />
            <span>{issue.upvotes || 0} Upvotes</span>
          </button>
        </div>
      </div>

      {/* Grid: Photo Evidence / Before-After Slider (Left 6) + Map & Info (Right 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Photo Evidence / Before-After Slider */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center justify-between">
              <span>Incident Visual Evidence</span>
              {issue.beforeAfterImage?.after && (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Before/After Mode Active
                </span>
              )}
            </h3>

            {issue.beforeAfterImage?.after ? (
              <BeforeAfterSlider
                beforeImage={issue.beforeAfterImage.before || issue.image}
                afterImage={issue.beforeAfterImage.after}
              />
            ) : (
              <div className="relative h-80 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <img src={issue.image} alt={issue.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-slate-200 border border-slate-700">
                  Initial Reported Evidence Photo
                </div>
              </div>
            )}

            {/* AI Computer Vision Diagnostic Tag */}
            {issue.aiDetection && (
              <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/20 text-sky-400 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="text-xs space-y-0.5">
                  <p className="font-bold text-sky-300">AI Visual Diagnostic Tag</p>
                  <p className="text-slate-300">Object Classification: <span className="font-semibold text-white">{issue.aiDetection.detectedObject}</span> ({issue.aiDetection.confidencePercent || 95}% confidence)</p>
                </div>
              </div>
            )}
          </div>

          {/* Citizen Verification Panel (Appears when status is 'Fixed' or 'Verified') */}
          {issue.status === 'Fixed' && (
            <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 space-y-4 bg-emerald-950/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-300">Work Completed by Municipal Crew</h3>
                  <p className="text-xs text-slate-300">As the reporting resident, please inspect the resolution and verify completeness.</p>
                </div>
              </div>

              <textarea
                rows={2}
                placeholder="Optional resolution rating note or feedback..."
                value={feedbackNote}
                onChange={e => setFeedbackNote(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              />

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => handleVerifyAction('verify')}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Resolution & Close</span>
                </button>

                <button
                  onClick={() => handleVerifyAction('reopen')}
                  className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
                >
                  Flag as Incomplete
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Geolocation Map & Chronological Audit Timeline */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Leaflet Location Map */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Geospatial Location</h3>
            <MapView
              issues={[issue]}
              height="200px"
              center={[issue.location?.lat || 37.7749, issue.location?.lng || -122.4194]}
              zoom={15}
            />
            <p className="text-xs text-slate-400 font-medium">Assigned Dept: <span className="text-sky-400 font-semibold">{issue.assignedDepartment}</span></p>
          </div>

          {/* Chronological Lifecycle Timeline */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center justify-between">
              <span>Timeline of Actions</span>
              <span className="text-xs font-mono text-sky-400">{issue.timeline?.length || 0} Milestones</span>
            </h3>

            <Timeline events={issue.timeline || []} />
          </div>

        </div>

      </div>

    </div>
  );
};

