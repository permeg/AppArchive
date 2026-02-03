import { Calendar, FileText, ArrowUpDown, Filter } from 'lucide-react';
import type { ApplicationLog } from '../types';
import { StatusBadge } from './StatusBadge';

interface ApplicationListProps {
  applications: ApplicationLog[];
  onSelectApp: (app: ApplicationLog) => void;
  sortBy: 'date-desc' | 'date-asc';
  onSortChange: (sortBy: 'date-desc' | 'date-asc') => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function ApplicationList({
  applications,
  onSelectApp,
  sortBy,
  onSortChange,
  hasActiveFilters,
  onClearFilters
}: ApplicationListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  const toggleSort = () => {
    onSortChange(sortBy === 'date-desc' ? 'date-asc' : 'date-desc');
  };

  if (applications.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {hasActiveFilters ? (
              <Filter className="w-8 h-8 text-neutral-400" />
            ) : (
              <FileText className="w-8 h-8 text-neutral-400" />
            )}
          </div>
          <h3 className="font-semibold text-neutral-900 mb-2">
            {hasActiveFilters ? 'No matching applications' : 'No application logs yet'}
          </h3>
          <p className="text-neutral-500 mb-6">
            {hasActiveFilters
              ? 'Try adjusting your filters or search query to find what you\'re looking for.'
              : 'Get started by adding your first application log to track and reuse your responses.'}
          </p>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-neutral-900">Application Logs</h2>
          <button
            onClick={toggleSort}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
            {sortBy === 'date-desc' ? 'Newest first' : 'Oldest first'}
          </button>
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <button
              key={app.id}
              onClick={() => onSelectApp(app)}
              className="w-full bg-white border border-neutral-200 rounded-xl p-6 hover:border-neutral-300 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 group-hover:text-neutral-700 mb-1">
                    {app.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-neutral-500">
                    <span className="inline-flex items-center gap-1.5">
                      <FileText className="w-4 h-4" />
                      {app.purpose}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {formatDate(app.dateSubmitted)}
                    </span>
                  </div>
                </div>
                <StatusBadge status={app.status} />
              </div>

              {app.notes && (
                <p className="text-sm text-neutral-600 mb-3">{app.notes}</p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                <span className="text-sm text-neutral-500">
                  {app.questions.length} {app.questions.length === 1 ? 'question' : 'questions'}
                </span>
                <span className="text-sm text-neutral-400 group-hover:text-neutral-900 transition-colors">
                  View details →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
