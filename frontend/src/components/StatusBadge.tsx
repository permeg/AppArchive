import type { ApplicationStatus } from '../types';

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const statusConfig: Record<ApplicationStatus, { label: string; className: string }> = {
  draft: {
    label: 'Draft',
    className: 'bg-neutral-100 text-neutral-700 border-neutral-200'
  },
  submitted: {
    label: 'Submitted',
    className: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  accepted: {
    label: 'Accepted',
    className: 'bg-green-100 text-green-700 border-green-200'
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-700 border-red-200'
  }
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.className}`}>
      {config.label}
    </span>
  );
}
