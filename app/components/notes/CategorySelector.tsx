'use client';

import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  onAddCategory: (category: string) => void;
  disabled?: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  disabled = false,
}) => {
  const [newCategory, setNewCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory('');
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newCategory.trim()) {
      e.preventDefault();
      handleAddCategory();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewCategory('');
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Categories</h4>
        {!isAdding && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAdding(true)}
            disabled={disabled}
          >
            Add Category
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="New category name"
            autoFocus
            disabled={disabled}
          />
          <Button
            size="sm"
            onClick={handleAddCategory}
            disabled={!newCategory.trim() || disabled}
          >
            Add
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setIsAdding(false);
              setNewCategory('');
            }}
            disabled={disabled}
          >
            Cancel
          </Button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => onSelectCategory(null)}
        >
          All
        </Badge>
        
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Badge>
        ))}
        
        {categories.length === 0 && !isAdding && (
          <div className="text-sm text-gray-500">
            No categories yet. Add one to get started.
          </div>
        )}
      </div>
    </div>
  );
};
