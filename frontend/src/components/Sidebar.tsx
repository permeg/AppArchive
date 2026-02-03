import { Search, X } from 'lucide-react';
import { TagChip } from './TagChip';

interface SidebarProps {
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export function Sidebar({
  allTags,
  selectedTags,
  onTagToggle,
  searchQuery,
  onSearchChange,
  onClearFilters
}: SidebarProps) {
  const hasActiveFilters = selectedTags.length > 0 || searchQuery.trim().length > 0;

  return (
    <aside className="w-80 bg-white border-r border-neutral-200 flex flex-col">
      <div className="p-6 border-b border-neutral-200">
        <h2 className="font-semibold text-neutral-900 mb-4">Search & Filter</h2>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search responses..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-neutral-900">Filter by Tags</h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {selectedTags.length > 0 && (
          <div className="mb-4 pb-4 border-b border-neutral-200">
            <p className="text-xs text-neutral-500 mb-2">Active Filters ({selectedTags.length})</p>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map(tag => (
                <TagChip
                  key={tag}
                  tag={tag}
                  selected={true}
                  onClick={() => onTagToggle(tag)}
                  size="sm"
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <TagChip
              key={tag}
              tag={tag}
              selected={selectedTags.includes(tag)}
              onClick={() => onTagToggle(tag)}
              size="sm"
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
