'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';

interface ConnectionType {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
}

interface ConnectionTypeSelectorProps {
  onSelect: (connectionType: string) => void;
  selectedType?: string;
}

export const ConnectionTypeSelector: React.FC<ConnectionTypeSelectorProps> = ({
  onSelect,
  selectedType = 'related',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const connectionTypes: ConnectionType[] = [
    {
      id: 'related',
      name: 'Related',
      description: 'Ideas that are related or connected',
      color: '#6868ff',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'contradiction',
      name: 'Contradiction',
      description: 'Ideas that contradict or oppose each other',
      color: '#ef4444',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'extension',
      name: 'Extension',
      description: 'Ideas that extend or build upon others',
      color: '#10b981',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'ai_suggested',
      name: 'AI Suggested',
      description: 'Connections suggested by AI',
      color: '#8b5cf6',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'category',
      name: 'Category',
      description: 'Ideas in the same category',
      color: '#f59e0b',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  const selectedConnectionType = connectionTypes.find(type => type.id === selectedType) || connectionTypes[0];

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: selectedConnectionType.color }}
          />
          <span>{selectedConnectionType.name}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Button>
        <Badge variant="secondary">Connection Type</Badge>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {connectionTypes.map((type) => (
              <Tooltip key={type.id} content={type.description}>
                <button
                  className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                    selectedType === type.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  role="menuitem"
                  onClick={() => {
                    onSelect(type.id);
                    setIsOpen(false);
                  }}
                >
                  <span 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: type.color }}
                  />
                  <span className="mr-2">{type.icon}</span>
                  <span>{type.name}</span>
                </button>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
