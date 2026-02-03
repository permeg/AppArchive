import { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface TagInputProps {
  onAdd: (tag: string) => void;
  onCancel: () => void;
  existingTags: string[];
}

export function TagInput({ onAdd, onCancel, existingTags }: TagInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    const trimmedValue = value.trim();
    if (trimmedValue) {
      onAdd(trimmedValue);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="inline-flex items-center gap-1 bg-white border border-neutral-300 rounded-full px-2 py-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type tag name..."
        className="outline-none text-sm px-1 w-32"
      />
      <button
        onClick={handleSubmit}
        className="p-1 hover:bg-green-100 text-green-600 rounded-full transition-colors"
        title="Add tag"
      >
        <Check className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={onCancel}
        className="p-1 hover:bg-red-100 text-red-600 rounded-full transition-colors"
        title="Cancel"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
