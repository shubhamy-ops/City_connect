import React from 'react';
import { useIssues } from '../context/IssueContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToast = () => {
  const { toasts } = useIssues();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl glass-panel border border-slate-700/60 shadow-2xl animate-bounce-short text-slate-100 transition-all duration-300"
          >
            <div className={`p-2 rounded-lg shrink-0 ${
              isSuccess ? 'bg-emerald-500/20 text-emerald-400' :
              isWarning ? 'bg-amber-500/20 text-amber-400' :
              'bg-sky-500/20 text-sky-400'
            }`}>
              {isSuccess ? <CheckCircle2 className="w-5 h-5" /> :
               isWarning ? <AlertCircle className="w-5 h-5" /> :
               <Info className="w-5 h-5" />}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-100">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

