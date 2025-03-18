'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { NoteCard } from './NoteCard';
import { Badge } from '../ui/Badge';

interface Note {
  id: string;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

interface NoteListProps {
  notes: Note[];
  onCreateNote: () => void;
  onEditNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onViewNote: (noteId: string) => void;
  isLoading?: boolean;
}

export const NoteList: React.FC<NoteListProps> = ({
  notes,
  onCreateNote,
  onEditNote,
  onDeleteNote,
  onViewNote,
  isLoading = false,
}) => {
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

  // Extract unique categories and tags
  const categories = Array.from(
    new Set(notes.filter(note => note.category).map(note => note.category))
  );
  
  const tags = Array.from(
    new Set(
      notes
        .filter(note => note.tags && note.tags.length > 0)
        .flatMap(note => note.tags || [])
    )
  );

  // Apply filters
  useEffect(() => {
    let result = [...notes];
    
    // Apply visibility filter
    if (filter === 'public') {
      result = result.filter(note => note.is_public);
    } else if (filter === 'private') {
      result = result.filter(note => !note.is_public);
    }
    
    // Apply category filter
    if (categoryFilter) {
      result = result.filter(note => note.category === categoryFilter);
    }
    
    // Apply tag filter
    if (tagFilter) {
      result = result.filter(
        note => note.tags && note.tags.includes(tagFilter)
      );
    }
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        note =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
      );
    }
    
    // Sort by updated_at (newest first)
    result.sort((a, b) => 
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
    
    setFilteredNotes(result);
  }, [notes, filter, categoryFilter, tagFilter, searchQuery]);

  // Clear all filters
  const clearFilters = () => {
    setFilter('all');
    setCategoryFilter(null);
    setTagFilter(null);
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your Notes</h3>
        <Button onClick={onCreateNote} disabled={isLoading}>
          Create New Note
        </Button>
      </div>
      
      {/* Search and filters */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            🔍
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="space-x-1">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
              disabled={isLoading}
            >
              All
            </Button>
            <Button
              variant={filter === 'public' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('public')}
              disabled={isLoading}
            >
              Public
            </Button>
            <Button
              variant={filter === 'private' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('private')}
              disabled={isLoading}
            >
              Private
            </Button>
          </div>
          
          {(categoryFilter || tagFilter) && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              disabled={isLoading}
            >
              Clear Filters
            </Button>
          )}
        </div>
        
        {/* Category filters */}
        {categories.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Categories</h4>
            <div className="flex flex-wrap gap-1">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={categoryFilter === category ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setCategoryFilter(
                    categoryFilter === category ? null : category
                  )}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Tag filters */}
        {tags.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Tags</h4>
            <div className="flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  variant={tagFilter === tag ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Notes grid */}
      {isLoading ? (
        <div className="text-center p-8">
          <p>Loading notes...</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500 mb-4">No notes found</p>
          <Button onClick={onCreateNote}>Create Your First Note</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onEditNote}
              onDelete={onDeleteNote}
              onView={onViewNote}
            />
          ))}
        </div>
      )}
    </div>
  );
};
