'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Badge } from '../ui/Badge';

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  placeholder?: string;
  disabled?: boolean;
  maxTags?: number;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onAddTag,
  onRemoveTag,
  placeholder = 'Add tags...',
  disabled = false,
  maxTags = 10,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle tag addition
  const handleAddTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (
      trimmedTag &&
      !tags.includes(trimmedTag) &&
      tags.length < maxTags
    ) {
      onAddTag(trimmedTag);
      setInputValue('');
    }
  };

  // Handle key press events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      // Remove the last tag when backspace is pressed in an empty input
      onRemoveTag(tags[tags.length - 1]);
    } else if (e.key === ',' && inputValue.trim()) {
      // Allow comma to separate tags
      e.preventDefault();
      handleAddTag(inputValue);
    }
  };

  // Handle paste event to add multiple tags at once
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const pastedTags = pastedText
      .split(/[,;\n]/)
      .map(tag => tag.trim())
      .filter(tag => tag && !tags.includes(tag));
    
    // Add tags up to the maximum
    const availableSlots = maxTags - tags.length;
    const tagsToAdd = pastedTags.slice(0, availableSlots);
    
    tagsToAdd.forEach(tag => onAddTag(tag));
  };

  // Focus the input when clicking on the container
  const handleContainerClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={`flex flex-wrap gap-2 p-2 border rounded-md transition-colors ${
        isFocused
          ? 'border-primary-500 ring-2 ring-primary-100'
          : 'border-gray-300'
      } ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'cursor-text'}`}
      onClick={handleContainerClick}
    >
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
          {tag}
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveTag(tag);
              }}
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          )}
        </Badge>
      ))}
      
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          if (inputValue.trim()) {
            handleAddTag(inputValue);
          }
        }}
        placeholder={tags.length === 0 ? placeholder : ''}
        className="flex-grow min-w-[120px] outline-none bg-transparent"
        disabled={disabled || tags.length >= maxTags}
      />
      
      {tags.length >= maxTags && (
        <span className="text-xs text-gray-500">
          Maximum tags reached ({maxTags})
        </span>
      )}
    </div>
  );
};
