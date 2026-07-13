import { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, Star, MapPin } from 'lucide-react';

interface AutocompleteItem {
  name: string;
  type?: string;
  parent?: string;
  icon?: any;
  [key: string]: any;
}

interface SearchAutocompleteProps {
  value: string;
  onChange: (val: string) => void;
  onSelect: (item: AutocompleteItem) => void;
  items: AutocompleteItem[];
  placeholder?: string;
  className?: string;
  localStorageKey?: string;
  searchKey?: string;
  groupKey?: string;
}

export function SearchAutocomplete({
  value,
  onChange,
  onSelect,
  items,
  placeholder = 'Search...',
  className = '',
  localStorageKey = 'default_search',
  searchKey = 'name',
  groupKey = 'type'
}: SearchAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [recentSearches, setRecentSearches] = useState<AutocompleteItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    const saved = localStorage.getItem(`eh_recent_${localStorageKey}`);
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (err) {
        console.error('Error parsing recent searches:', err);
      }
    }
  }, [localStorageKey]);

  // Sync state if initial value changes
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter items based on query
  const getFilteredItems = (): AutocompleteItem[] => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    // Simple fuzzy search matching substring
    return items.filter(item => {
      const matchField = String(item[searchKey] || '').toLowerCase();
      const matchParent = String(item.parent || '').toLowerCase();
      return matchField.includes(q) || matchParent.includes(q);
    });
  };

  const filteredItems = getFilteredItems();

  // Create a flattened list of items representing the display order for keyboard navigation
  const getFlatFilteredItems = (): AutocompleteItem[] => {
    if (query.trim() === '') {
      // Return combination of recent and frequent choices
      return [...recentSearches, ...items.slice(0, 5)];
    }
    return filteredItems;
  };

  const flatItems = getFlatFilteredItems();

  // Group filtered items
  const groupItems = (list: AutocompleteItem[]) => {
    return list.reduce((acc, curr) => {
      const groupName = curr[groupKey] || 'Suggestions';
      if (!acc[groupName]) acc[groupName] = [];
      acc[groupName].push(curr);
      return acc;
    }, {} as Record<string, AutocompleteItem[]>);
  };

  const groupedFiltered = groupItems(filteredItems);

  // Handle selecting an item
  const handleItemSelect = (item: AutocompleteItem) => {
    setQuery(item[searchKey]);
    onChange(item[searchKey]);
    onSelect(item);
    setIsOpen(false);

    // Save to recents
    const filteredRecents = recentSearches.filter(r => r[searchKey] !== item[searchKey]);
    const updatedRecents = [item, ...filteredRecents].slice(0, 5);
    setRecentSearches(updatedRecents);
    localStorage.setItem(`eh_recent_${localStorageKey}`, JSON.stringify(updatedRecents));
  };

  // Keyboard navigation handlers
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => Math.min(prev + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < flatItems.length) {
        handleItemSelect(flatItems[activeIndex]);
      } else if (filteredItems.length > 0) {
        handleItemSelect(filteredItems[0]);
      } else if (query.trim()) {
        // Fallback for custom entries
        handleItemSelect({ name: query.trim() });
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Highlight matches
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() 
            ? <mark key={i} className="bg-amber-100 text-amber-950 font-bold px-0.5 rounded">{part}</mark> 
            : part
        )}
      </span>
    );
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-10 pr-10 py-3 text-sm font-semibold text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#BC2C2C]/30 transition-all placeholder:text-gray-400 placeholder:font-medium"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onChange('');
              setActiveIndex(-1);
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute left-0 w-full mt-2 bg-white border border-gray-150 rounded-2xl shadow-xl z-50 max-h-80 overflow-y-auto p-3.5 animate-in slide-in-from-top-2 duration-200">
          
          {/* Empty search: show recents & popular/frequent choices */}
          {query.trim() === '' ? (
            <div className="space-y-4">
              {recentSearches.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" /> Recent Searches
                  </h4>
                  <div className="space-y-0.5">
                    {recentSearches.map((item, idx) => (
                      <button
                        key={`recent-${idx}`}
                        type="button"
                        onClick={() => handleItemSelect(item)}
                        className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                          activeIndex === idx ? 'bg-gray-50' : ''
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{item[searchKey]}</span>
                        {item.parent && <span className="text-gray-400 font-medium">({item.parent})</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500" /> Popular Choices
                </h4>
                <div className="space-y-0.5">
                  {items.slice(0, 5).map((item, idx) => {
                    const offsetIndex = recentSearches.length + idx;
                    return (
                      <button
                        key={`frequent-${idx}`}
                        type="button"
                        onClick={() => handleItemSelect(item)}
                        className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                          activeIndex === offsetIndex ? 'bg-gray-50' : ''
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>{item[searchKey]}</span>
                        {item.parent && <span className="text-gray-400 font-medium">({item.parent})</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Non-empty search: show grouped results */
            <>
              {Object.keys(groupedFiltered).length > 0 ? (
                Object.entries(groupedFiltered).map(([groupName, groupList]) => (
                  <div key={groupName} className="mb-3 last:mb-0">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 capitalize">{groupName}</h4>
                    <div className="space-y-0.5">
                      {groupList.map((item) => {
                        // Find index of this item in the flat list to enable active highlights
                        const idx = flatItems.findIndex(f => f[searchKey] === item[searchKey]);
                        return (
                          <button
                            key={item[searchKey]}
                            type="button"
                            onClick={() => handleItemSelect(item)}
                            className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center justify-between ${
                              activeIndex === idx ? 'bg-gray-50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <span className="text-gray-800">
                                {highlightText(item[searchKey], query)}
                                {item.parent && <span className="text-gray-400 font-medium ml-1">({item.parent})</span>}
                              </span>
                            </div>
                            {item[groupKey] && (
                              <span className="text-[9px] bg-gray-100 text-gray-500 font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                                {item[groupKey]}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-2">
                  <div className="text-xs text-gray-400 font-medium py-1">
                    No exact matching results found.
                  </div>
                  <button
                    type="button"
                    onClick={() => handleItemSelect({ name: query.trim() })}
                    className="w-full text-left p-2 rounded-xl text-xs font-bold text-[#BC2C2C] hover:bg-red-50/50 transition-colors flex items-center gap-2"
                  >
                    <span>Use custom entry: "{query.trim()}"</span>
                  </button>
                </div>
              )}
            </>
          )}

        </div>
      )}
    </div>
  );
}
