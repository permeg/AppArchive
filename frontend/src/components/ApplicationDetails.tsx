import { ArrowLeft, Calendar, FileText } from 'lucide-react';
import type { ApplicationLog } from '../types';
import { StatusBadge } from './StatusBadge';
import { QuestionCard } from './QuestionCard';

interface ApplicationDetailProps {
  application: ApplicationLog;
  onBack: () => void;
  onUpdateTags: (appId: string, questionId: string, newTags: string[]) => void;
}

export function ApplicationDetail({ application, onBack, onUpdateTags }: ApplicationDetailProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-neutral-200 px-8 py-4 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all applications
        </button>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="font-semibold text-neutral-900 mb-2">{application.name}</h1>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span className="inline-flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                {application.purpose}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(application.dateSubmitted)}
              </span>
              <StatusBadge status={application.status} />
            </div>
            {application.notes && (
              <p className="text-sm text-neutral-600 mt-2">{application.notes}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold text-neutral-900">
              Questions & Responses ({application.questions.length})
            </h2>
          </div>

          {application.questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              onUpdateTags={(newTags) => onUpdateTags(application.id, question.id, newTags)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
