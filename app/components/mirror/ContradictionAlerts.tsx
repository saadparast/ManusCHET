'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';

interface Contradiction {
  id: string;
  note1: {
    id: string;
    title: string;
    content: string;
    created_at: string;
  };
  note2: {
    id: string;
    title: string;
    content: string;
    created_at: string;
  };
  description: string;
  status: 'unresolved' | 'resolved' | 'dismissed';
  created_at: string;
}

interface ContradictionAlertsProps {
  contradictions: Contradiction[];
  onResolve?: (contradictionId: string) => void;
  onDismiss?: (contradictionId: string) => void;
  onViewDetail?: (contradiction: Contradiction) => void;
}

export const ContradictionAlerts: React.FC<ContradictionAlertsProps> = ({
  contradictions,
  onResolve,
  onDismiss,
  onViewDetail,
}) => {
  const [selectedContradiction, setSelectedContradiction] = useState<Contradiction | null>(null);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Handle contradiction selection
  const handleSelect = (contradiction: Contradiction) => {
    setSelectedContradiction(contradiction);
    if (onViewDetail) {
      onViewDetail(contradiction);
    }
  };

  // Handle resolve action
  const handleResolve = (contradictionId: string) => {
    if (onResolve) {
      onResolve(contradictionId);
    }
  };

  // Handle dismiss action
  const handleDismiss = (contradictionId: string) => {
    if (onDismiss) {
      onDismiss(contradictionId);
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unresolved':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'dismissed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Contradictions list */}
      <div className="w-full md:w-1/3 flex-shrink-0">
        <h3 className="text-lg font-semibold mb-4">Contradiction Alerts</h3>
        
        {contradictions.length === 0 ? (
          <div className="p-4 border border-dashed border-gray-300 rounded-md text-center">
            <p className="text-gray-500">No contradictions found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contradictions.map((contradiction) => (
              <div
                key={contradiction.id}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${
                  selectedContradiction?.id === contradiction.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleSelect(contradiction)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 line-clamp-1">
                      {contradiction.note1.title} vs. {contradiction.note2.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(contradiction.created_at)}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                      contradiction.status
                    )}`}
                  >
                    {contradiction.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {contradiction.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contradiction detail view */}
      <div className="flex-grow">
        {selectedContradiction ? (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Contradiction Detail</CardTitle>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                    selectedContradiction.status
                  )}`}
                >
                  {selectedContradiction.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Detected on {formatDate(selectedContradiction.created_at)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-base font-medium mb-2">Contradiction Description</h3>
                <p className="text-gray-700">{selectedContradiction.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar size="sm" name={selectedContradiction.note1.title} />
                    <div>
                      <h4 className="font-medium">{selectedContradiction.note1.title}</h4>
                      <p className="text-xs text-gray-500">
                        {formatDate(selectedContradiction.note1.created_at)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-6">
                    {selectedContradiction.note1.content}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar size="sm" name={selectedContradiction.note2.title} />
                    <div>
                      <h4 className="font-medium">{selectedContradiction.note2.title}</h4>
                      <p className="text-xs text-gray-500">
                        {formatDate(selectedContradiction.note2.created_at)}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-6">
                    {selectedContradiction.note2.content}
                  </p>
                </div>
              </div>

              {selectedContradiction.status === 'unresolved' && (
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleDismiss(selectedContradiction.id)}
                  >
                    Dismiss
                  </Button>
                  <Button
                    onClick={() => handleResolve(selectedContradiction.id)}
                  >
                    Resolve Contradiction
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-64 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">Select a contradiction to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};
