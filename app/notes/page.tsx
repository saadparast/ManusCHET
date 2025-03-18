'use client';

import React, { useState } from 'react';
import { NoteEditor } from '../components/notes/NoteEditor';
import { NoteList } from '../components/notes/NoteList';
import { NoteCard } from '../components/notes/NoteCard';
import { CategorySelector } from '../components/notes/CategorySelector';
import { TagInput } from '../components/notes/TagInput';

export default function NotesPage() {
  const [activeView, setActiveView] = useState<'list' | 'editor' | 'detail'>('list');
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  // Mock data for testing
  const mockNotes = [
    {
      id: 'n1',
      title: 'Climate Change Solutions',
      content: 'Nuclear energy is the most efficient solution to climate change as it produces zero carbon emissions during operation. However, we must also consider the waste management challenges and potential risks.',
      category: 'Environment',
      tags: ['climate', 'energy', 'nuclear'],
      created_at: '2025-01-15T10:30:00Z',
      updated_at: '2025-01-20T14:45:00Z',
      is_public: true,
    },
    {
      id: 'n2',
      title: 'Renewable Energy',
      content: 'Solar and wind power are the only viable long-term solutions to climate change due to their sustainability and lack of waste products. The main challenge is storage and intermittency.',
      category: 'Environment',
      tags: ['climate', 'energy', 'renewable'],
      created_at: '2025-02-20T14:45:00Z',
      updated_at: '2025-02-22T09:15:00Z',
      is_public: false,
    },
    {
      id: 'n3',
      title: 'AI Ethics',
      content: 'AI development should be regulated by international bodies to ensure ethical standards are maintained globally. This includes considerations for privacy, bias, and transparency.',
      category: 'Technology',
      tags: ['AI', 'ethics', 'regulation'],
      created_at: '2025-01-10T11:20:00Z',
      updated_at: '2025-01-12T16:30:00Z',
      is_public: true,
    },
  ];

  const mockCategories = ['Environment', 'Technology', 'Philosophy', 'Personal'];

  // Mock handlers
  const handleCreateNote = () => {
    setSelectedNoteId(null);
    setActiveView('editor');
  };

  const handleEditNote = (noteId: string) => {
    setSelectedNoteId(noteId);
    setActiveView('editor');
  };

  const handleViewNote = (noteId: string) => {
    setSelectedNoteId(noteId);
    setActiveView('detail');
  };

  const handleDeleteNote = (noteId: string) => {
    console.log('Deleting note:', noteId);
    // In a real implementation, this would call an API
  };

  const handleSaveNote = async (note: any) => {
    console.log('Saving note:', note);
    // In a real implementation, this would call an API
    setActiveView('list');
    return Promise.resolve();
  };

  const handleCancelEdit = () => {
    setActiveView('list');
  };

  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
    console.log('Selected category:', category);
  };

  const handleAddCategory = (category: string) => {
    console.log('Adding category:', category);
    // In a real implementation, this would call an API
  };

  const handleAddTag = (tag: string) => {
    setTags([...tags, tag]);
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Get the selected note
  const selectedNote = mockNotes.find(note => note.id === selectedNoteId);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Notes</h1>
      
      {activeView === 'list' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <CategorySelector
                categories={mockCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                onAddCategory={handleAddCategory}
              />
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <TagInput
                  tags={tags}
                  onAddTag={handleAddTag}
                  onRemoveTag={handleRemoveTag}
                  placeholder="Filter by tags..."
                />
              </div>
            </div>
            
            <div className="md:col-span-3">
              <NoteList
                notes={mockNotes}
                onCreateNote={handleCreateNote}
                onEditNote={handleEditNote}
                onDeleteNote={handleDeleteNote}
                onViewNote={handleViewNote}
              />
            </div>
          </div>
        </div>
      )}
      
      {activeView === 'editor' && (
        <NoteEditor
          note={selectedNote}
          onSave={handleSaveNote}
          onCancel={handleCancelEdit}
        />
      )}
      
      {activeView === 'detail' && selectedNote && (
        <div className="space-y-4">
          <button
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            onClick={() => setActiveView('list')}
          >
            ← Back to Notes
          </button>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-bold mb-2">{selectedNote.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedNote.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-gray-100 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="text-sm text-gray-500 mb-4">
              Category: {selectedNote.category || 'Uncategorized'} • 
              Last updated: {new Date(selectedNote.updated_at).toLocaleDateString()} •
              {selectedNote.is_public ? ' Public' : ' Private'}
            </div>
            
            <div className="prose max-w-none">
              <p>{selectedNote.content}</p>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => handleDeleteNote(selectedNote.id)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                onClick={() => handleEditNote(selectedNote.id)}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
