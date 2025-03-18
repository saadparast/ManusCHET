'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface DebateInterface {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'cancelled';
  created_at: string;
  persona?: {
    id: string;
    name: string;
    avatar?: string;
  };
  messageCount: number;
  score?: number;
}

interface DebateInterfaceProps {
  debates: DebateInterface[];
  onStartDebate: () => void;
  onContinueDebate: (debateId: string) => void;
  onViewDebate: (debateId: string) => void;
}

export const DebateInterface: React.FC<DebateInterfaceProps> = ({
  debates,
  onStartDebate,
  onContinueDebate,
  onViewDebate,
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Filter debates based on selected filter
  const filteredDebates = debates.filter((debate) => {
    if (filter === 'all') return true;
    if (filter === 'active') return debate.status === 'active';
    if (filter === 'completed') return debate.status === 'completed';
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Debate Mode</h3>
        <Button onClick={onStartDebate}>Start New Debate</Button>
      </div>

      <div className="flex space-x-2 mb-4">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All Debates
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      {filteredDebates.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500 mb-4">No debates found</p>
          <Button onClick={onStartDebate}>Start Your First Debate</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDebates.map((debate) => (
            <Card key={debate.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{debate.title}</CardTitle>
                    <p className="text-xs text-gray-500">
                      Started on {formatDate(debate.created_at)}
                    </p>
                  </div>
                  <Badge
                    variant={
                      debate.status === 'active'
                        ? 'success'
                        : debate.status === 'completed'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {debate.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {debate.description}
                </p>
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <span>With:</span>
                    <Badge variant="outline">
                      {debate.persona?.name || 'AI Persona'}
                    </Badge>
                  </div>
                  <div>{debate.messageCount} messages</div>
                </div>
                
                {debate.score !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Debate Score</span>
                      <span>{debate.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-primary-500 h-1.5 rounded-full"
                        style={{ width: `${debate.score}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDebate(debate.id)}
                  >
                    View
                  </Button>
                  {debate.status === 'active' && (
                    <Button
                      size="sm"
                      onClick={() => onContinueDebate(debate.id)}
                    >
                      Continue
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
