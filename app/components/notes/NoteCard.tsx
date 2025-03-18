'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
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

interface NoteCardProps {
  note: Note;
  onEdit: (noteId: string) => void;
  onDelete: (noteId: string) => void;
  onView: (noteId: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
  onView,
}) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Truncate content for preview
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base line-clamp-1">{note.title}</CardTitle>
          {note.is_public && (
            <Badge variant="secondary">Public</Badge>
          )}
        </div>
        <div className="text-xs text-gray-500 flex justify-between items-center">
          <span>Updated: {formatDate(note.updated_at)}</span>
          {note.category && (
            <Badge variant="outline" className="text-xs">
              {note.category}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <div className="text-sm text-gray-700 mb-3 flex-grow">
          {truncateContent(note.content)}
        </div>
        
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex justify-end space-x-2 mt-auto pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(note.id)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            onClick={() => onView(note.id)}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
