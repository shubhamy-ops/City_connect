import React from 'react';
import { AlertTriangle, Flame, ShieldAlert, ArrowDown } from 'lucide-react';

const PRIORITY_CONFIG = {
  Low: {
    bg: 'bg-slate-800 text-slate-300 border-slate-700',
    icon: ArrowDown,
    label: 'Low Priority'
  },
  Medium: {
    bg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    icon: AlertTriangle,
    label: 'Medium'
  },
  High: {
    bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: Flame,
    label: 'High Priority'
  },
  Urgent: {
    bg: 'bg-rose-500/15 text-rose-400 border-rose-500/40 animate-pulse',
    icon: ShieldAlert,
    label: 'URGENT SLA'
  }
};

export const PriorityBadge = ({ priority = 'Medium', size = 'md' }) => {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.Medium;
  const Icon = config.icon;

  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5 gap-1' : 'text-xs px-2.5 py-1 gap-1.5 font-semibold';

  return (
    <span className={`inline-flex items-center rounded-full border ${config.bg} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
};

