import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import type { Question } from '../types';
import { TagChip } from './TagChip';
import { TagInput } from './TagInput';

interface QuestionCardProps {
  question: Question;
  index: number;
  onUpdateTags: (newTags: string[]) => void;
}

export function QuestionCard({ question, index, onUpdateTags }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const [isAddingTag, setIsAddingTag] = useState(false);

  const handleRemoveTag = (tagToRemove: string) => {
    onUpdateTags(question.tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddTag = (newTag: string) => {
    if (newTag && !question.tags.includes(newTag)) {
      onUpdateTags([...question.tags, newTag]);
    }
    setIsAddingTag(false);
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:border-neutral-300 transition-all">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-neutral-50 transition-colors"
      >
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-neutral-100 text-neutral-600 rounded-full flex items-center justify-center text-xs font-medium">
              {index + 1}
            </span>
            <p className="font-medium text-neutral-900 flex-1">{question.questionText}</p>
          </div>
          {!isExpanded && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3 ml-9">
              {question.tags.slice(0, 5).map(tag => (
                <TagChip key={tag} tag={tag} size="sm" />
              ))}
              {question.tags.length > 5 && (
                <span className="text-xs text-neutral-500 px-2 py-1">
                  +{question.tags.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-neutral-400">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-neutral-100">
          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Response</label>
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 max-h-64 overflow-y-auto">
              <p className="text-neutral-900 whitespace-pre-wrap leading-relaxed">
                {question.response}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {question.tags.map(tag => (
                <TagChip
                  key={tag}
                  tag={tag}
                  editable
                  onRemove={() => handleRemoveTag(tag)}
                />
              ))}
              
              {isAddingTag ? (
                <TagInput
                  onAdd={handleAddTag}
                  onCancel={() => setIsAddingTag(false)}
                  existingTags={question.tags}
                />
              ) : (
                <button
                  onClick={() => setIsAddingTag(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm border-2 border-dashed border-neutral-300 text-neutral-600 rounded-full hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Tag
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
