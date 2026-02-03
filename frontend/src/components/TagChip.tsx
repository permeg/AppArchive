import { X } from 'lucide-react';

interface TagChipProps {
  tag: string;
  selected?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  editable?: boolean;
  size?: 'sm' | 'md';
}

const tagColors: Record<string, string> = {
  'Leadership': 'bg-purple-100 text-purple-700 border-purple-200',
  'Teamwork': 'bg-blue-100 text-blue-700 border-blue-200',
  'Problem Solving': 'bg-orange-100 text-orange-700 border-orange-200',
  'Research': 'bg-teal-100 text-teal-700 border-teal-200',
  'Python': 'bg-green-100 text-green-700 border-green-200',
  'JavaScript': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'React': 'bg-cyan-100 text-cyan-700 border-cyan-200',
  'Node.js': 'bg-lime-100 text-lime-700 border-lime-200',
  'Machine Learning': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Web Development': 'bg-pink-100 text-pink-700 border-pink-200',
  'Teaching': 'bg-amber-100 text-amber-700 border-amber-200',
  'Service': 'bg-rose-100 text-rose-700 border-rose-200',
  'Community Impact': 'bg-violet-100 text-violet-700 border-violet-200',
  'Healthcare': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Social Impact': 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
  'Perseverance': 'bg-sky-100 text-sky-700 border-sky-200',
};

const getTagColor = (tag: string) => {
  return tagColors[tag] || 'bg-neutral-100 text-neutral-700 border-neutral-200';
};

export function TagChip({ tag, selected = false, onClick, onRemove, editable = false, size = 'md' }: TagChipProps) {
  const baseClasses = 'inline-flex items-center gap-1.5 border rounded-full transition-all';
  const sizeClasses = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';
  const colorClasses = selected 
    ? 'ring-2 ring-neutral-900 ring-offset-1 ' + getTagColor(tag)
    : getTagColor(tag);
  const interactiveClasses = onClick ? 'cursor-pointer hover:ring-2 hover:ring-neutral-300 hover:ring-offset-1' : '';

  return (
    <span
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${colorClasses} ${interactiveClasses}`}
    >
      <span className="font-medium">{tag}</span>
      {editable && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
