'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface CollaborationInviteProps {
  invites: Array<{
    id: string;
    type: 'mindmap' | 'note' | 'debate';
    title: string;
    description?: string;
    sender: {
      id: string;
      displayName: string;
      username: string;
      avatar?: string;
    };
    created_at: string;
    status: 'pending' | 'accepted' | 'declined';
  }>;
  onAccept: (inviteId: string) => void;
  onDecline: (inviteId: string) => void;
  onViewInvite: (inviteId: string) => void;
}

export const CollaborationInvite: React.FC<CollaborationInviteProps> = ({
  invites,
  onAccept,
  onDecline,
  onViewInvite,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'declined'>('pending');

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Filter invites based on selected filter
  const filteredInvites = invites.filter(invite => {
    if (filter === 'all') return true;
    return invite.status === filter;
  });

  // Get type badge color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'mindmap':
        return 'bg-blue-100 text-blue-800';
      case 'note':
        return 'bg-green-100 text-green-800';
      case 'debate':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Collaboration Invites</h3>
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
          <Button
            variant={filter === 'accepted' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('accepted')}
          >
            Accepted
          </Button>
          <Button
            variant={filter === 'declined' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('declined')}
          >
            Declined
          </Button>
        </div>
      </div>
      
      {filteredInvites.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500">No {filter !== 'all' ? filter : ''} invites found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInvites.map((invite) => (
            <Card key={invite.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{invite.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getTypeColor(
                          invite.type
                        )}`}
                      >
                        {invite.type.charAt(0).toUpperCase() + invite.type.slice(1)}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          invite.status
                        )}`}
                      >
                        {invite.status.charAt(0).toUpperCase() + invite.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(invite.created_at)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {invite.description && (
                  <p className="text-sm text-gray-600 mb-3">
                    {invite.description}
                  </p>
                )}
                
                <div className="flex items-center gap-2 mb-4">
                  <Avatar
                    size="sm"
                    name={invite.sender.displayName}
                    src={invite.sender.avatar}
                  />
                  <div>
                    <p className="text-sm font-medium">{invite.sender.displayName}</p>
                    <p className="text-xs text-gray-500">@{invite.sender.username}</p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewInvite(invite.id)}
                  >
                    View Details
                  </Button>
                  
                  {invite.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDecline(invite.id)}
                      >
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onAccept(invite.id)}
                      >
                        Accept
                      </Button>
                    </>
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
