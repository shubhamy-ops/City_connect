import React from 'react';
import { Clock, UserCheck, Wrench, CheckCircle2, ShieldCheck } from 'lucide-react';

const STATUS_CONFIG = {
  Reported: {
    bg: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    icon: Clock,
    label: 'Reported'
  },
  Assigned: {
    bg: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    icon: UserCheck,
    label: 'Assigned'
  },
  'In Progress': {
    bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    icon: Wrench,
    label: 'In Progress'
  },
  Fixed: {
    bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    icon: CheckCircle2,
    label: 'Fixed'
  },
  Verified: {
    bg: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
    icon: ShieldCheck,
    label: 'Verified'
  }
};

export const StatusBadge = ({ status = 'Reported', size = 'md' }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Reported;
  const Icon = config.icon;

  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2 py-0.5 gap-1' 
    : size === 'lg' 
    ? 'text-sm px-3.5 py-1.5 gap-2 font-semibold' 
    : 'text-xs px-2.5 py-1 gap-1.5 font-medium';

  return (
    <span className={`inline-flex items-center rounded-full border ${config.bg} ${sizeClasses} shadow-sm backdrop-blur-sm`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>{config.label}</span>
    </span>
  );
};

