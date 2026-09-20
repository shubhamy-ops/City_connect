import React from 'react';
import { StatusBadge } from './StatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { MapPin, ThumbsUp, Clock, ArrowRight } from 'lucide-react';
import { useIssues } from '../context/IssueContext';

const STATUS_STEPS = ['Reported', 'Assigned', 'In Progress', 'Fixed', 'Verified'];

export const IssueCard = ({ issue }) => {
  const { navigateToDetail, upvoteIssue, currentUser } = useIssues();

  const isUpvoted = issue.upvotedBy?.includes(currentUser.id);
  const currentStepIndex = STATUS_STEPS.indexOf(issue.status);

  // SLA time calculations
  const calculateRemainingSLA = () => {
    if (issue.status === 'Fixed' || issue.status === 'Verified') return null;
    const diff = new Date(issue.slaDueDate) - new Date();
    if (diff <= 0) return { text: 'SLA Overdue', isOverdue: true };
    const hours = Math.floor(diff / (1000 * 3600));
    return { text: `${hours}h SLA`, isOverdue: false };
  };

  const slaInfo = calculateRemainingSLA();

  return (
    <div className="ui-card flex flex-col h-full overflow-hidden">
      {/* Photo Header */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-900">
        <img 
          src={issue.image} 
          alt={issue.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        
        {/* Top Status & Priority */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center">
          <StatusBadge status={issue.status} size="sm" />
          <PriorityBadge priority={issue.priority} size="sm" />
        </div>

        {/* Location Overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 font-medium">
          <span className="flex items-center gap-1 truncate max-w-[75%]">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{issue.location?.address}</span>
          </span>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-700">
            {issue.id}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-semibold text-emerald-400 tracking-wide">
              {issue.category}
            </span>
            {slaInfo && (
              <span className={`text-[11px] font-medium flex items-center gap-1 ${
                slaInfo.isOverdue ? 'text-rose-400 font-semibold' : 'text-slate-400'
              }`}>
                <Clock className="w-3 h-3" />
                {slaInfo.text}
              </span>
            )}
          </div>

          <h3 
            onClick={() => navigateToDetail(issue.id)}
            className="text-sm font-bold text-slate-100 hover:text-emerald-400 cursor-pointer line-clamp-2 transition-colors"
          >
            {issue.title}
          </h3>

          <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            {issue.description}
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-medium">
            <span>Status Progress</span>
            <span className="text-emerald-400 font-semibold">{issue.status}</span>
          </div>
          <div className="grid grid-cols-5 gap-1">
            {STATUS_STEPS.map((step, idx) => {
              const isCompleted = idx <= currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div 
                  key={step}
                  title={step}
                  className={`h-1.5 rounded-full transition-all ${
                    isCurrent 
                      ? 'bg-emerald-400' 
                      : isCompleted 
                      ? 'bg-emerald-600/70' 
                      : 'bg-slate-800'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <button
            onClick={(e) => {
              e.stopPropagation();
              upvoteIssue(issue.id);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              isUpvoted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            <span>{issue.upvotes || 0} Upvotes</span>
          </button>

          <button
            onClick={() => navigateToDetail(issue.id)}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
