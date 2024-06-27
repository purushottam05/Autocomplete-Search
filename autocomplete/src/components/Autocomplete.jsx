import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { getSummaries, getTitles } from '../data';

const Autocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = (value) => {
    if (value) {
      const summaries = getSummaries();
      const filtered = summaries
        .filter(summary => summary.summary.toLowerCase().includes(value.toLowerCase()))
        .map(summary => ({
          ...summary,
          occurrences: (summary.summary.match(new RegExp(value, 'gi')) || []).length,
        }))
        .sort((a, b) => b.occurrences - a.occurrences)
        .slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedFetchSuggestions(value);
  };

  const handleSelect = (id) => {
    onSelect(id);
    setQuery('');
    setSuggestions([]);
  };

  const highlightText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {}}>
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="relative flex justify-center">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="border p-2 w-2/5"
        placeholder="Search by Summary..."
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 bg-white border w-2/5 z-50 opacity-100">
          {suggestions.map(suggestion => (
            <li
              key={suggestion.id}
              onClick={() => handleSelect(suggestion.id)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {highlightText(getTitles()[suggestion.id], query)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
