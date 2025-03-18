'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
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

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Partial<Note>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  onSave,
  onCancel,
  isLoading = false,
}) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [category, setCategory] = useState(note?.category || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [isPublic, setIsPublic] = useState(note?.is_public || false);
  const [error, setError] = useState<string | null>(null);

  // Handle tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle save
  const handleSave = async () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    try {
      await onSave({
        id: note?.id,
        title,
        content,
        category: category || undefined,
        tags: tags.length > 0 ? tags : undefined,
        is_public: isPublic,
      });
    } catch (err) {
      setError('Failed to save note. Please try again.');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle>{note ? 'Edit Note' : 'Create New Note'}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Note title"
              disabled={isLoading}
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[200px]"
              placeholder="Write your note here..."
              disabled={isLoading}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category (optional)
            </label>
            <input
              id="category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Research, Thoughts, Ideas"
              disabled={isLoading}
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags (optional)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    &times;
                  </button>
                </Badge>
              ))}
            </div>
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Add tags (press Enter to add)"
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Press Enter to add a tag
            </p>
          </div>

          {/* Visibility */}
          <div className="flex items-center">
            <input
              id="is_public"
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="is_public" className="ml-2 block text-sm text-gray-700">
              Make this note public
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isLoading}
              isLoading={isLoading}
            >
              {note ? 'Update Note' : 'Create Note'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
