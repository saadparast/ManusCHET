'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface TimelineItem {
  id: string;
  version: number;
  content: string;
  created_at: string;
  change_summary?: string;
}

interface TimelineEvolutionProps {
  noteId: string;
  title: string;
  timelineItems: TimelineItem[];
  onVersionSelect?: (version: TimelineItem) => void;
}

export const TimelineEvolution: React.FC<TimelineEvolutionProps> = ({
  noteId,
  title,
  timelineItems,
  onVersionSelect,
}) => {
  const [selectedVersion, setSelectedVersion] = useState<TimelineItem | null>(
    timelineItems.length > 0 ? timelineItems[0] : null
  );

  const handleVersionSelect = (version: TimelineItem) => {
    setSelectedVersion(version);
    if (onVersionSelect) {
      onVersionSelect(version);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Timeline sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-4">
          <h3 className="text-lg font-semibold mb-4">Version History</h3>
          <div className="space-y-2">
            {timelineItems.map((item) => (
              <div
                key={item.id}
                className={`p-3 border rounded-md cursor-pointer transition-colors ${
                  selectedVersion?.id === item.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleVersionSelect(item)}
              >
                <div className="flex justify-between items-center mb-1">
                  <Badge variant="secondary">v{item.version}</Badge>
                  <span className="text-xs text-gray-500">
                    {formatDate(item.created_at)}
                  </span>
                </div>
                {item.change_summary && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.change_summary}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content view */}
      <div className="flex-grow">
        {selectedVersion ? (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>{title}</CardTitle>
                <Badge>Version {selectedVersion.version}</Badge>
              </div>
              <div className="text-sm text-gray-500">
                {formatDate(selectedVersion.created_at)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>{selectedVersion.content}</p>
              </div>
              
              {selectedVersion.change_summary && (
                <div className="mt-6 p-3 bg-gray-50 rounded-md">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Changes in this version:
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedVersion.change_summary}
                  </p>
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Handle restore version action
                    console.log('Restore version', selectedVersion);
                  }}
                >
                  Restore This Version
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    // Handle compare versions action
                    console.log('Compare versions');
                  }}
                >
                  Compare Versions
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-64 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">Select a version to view</p>
          </div>
        )}
      </div>
    </div>
  );
};
