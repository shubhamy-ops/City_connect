import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Clock, User, CheckCircle2 } from 'lucide-react';

export const Timeline = ({ events = [] }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="relative pl-6 border-l-2 border-slate-800 space-y-6 my-4">
      {events.map((event, idx) => {
        const isLatest = idx === events.length - 1;
        const formattedDate = new Date(event.timestamp).toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        return (
          <div key={idx} className="relative group">
            {/* Timeline Node Icon */}
            <div className={`absolute -left-[31px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
              isLatest 
                ? 'bg-sky-500 border-sky-300 text-white shadow-lg shadow-sky-500/50 scale-110' 
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>

            {/* Content Container */}
            <div className="glass-panel p-4 rounded-xl border border-slate-800/90 space-y-1.5 transition-colors group-hover:border-slate-700">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-slate-100">{event.title}</h4>
                  <StatusBadge status={event.status} size="sm" />
                </div>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {formattedDate}
                </span>
              </div>

              {event.note && (
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  "{event.note}"
                </p>
              )}

              {event.actor && (
                <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1 font-medium">
                  <User className="w-3 h-3 text-sky-400" />
                  <span>Action by: {event.actor}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

