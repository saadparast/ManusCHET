'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  intellectualPoints: number;
  badges: string[];
  isFollowing?: boolean;
}

interface CommunityFeedProps {
  users: UserProfile[];
  onViewProfile: (userId: string) => void;
  onFollow: (userId: string) => void;
  onUnfollow: (userId: string) => void;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({
  users,
  onViewProfile,
  onFollow,
  onUnfollow,
}) => {
  const [filter, setFilter] = useState<'all' | 'following'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query and filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      searchQuery === '' || 
      user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.bio && user.bio.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filter === 'all' || (filter === 'following' && user.isFollowing);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Community</h3>
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All Users
          </Button>
          <Button
            variant={filter === 'following' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('following')}
          >
            Following
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <span className="absolute left-3 top-2.5 text-gray-400">
          🔍
        </span>
      </div>
      
      {filteredUsers.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar
                    size="md"
                    name={user.displayName}
                    src={user.avatar}
                  />
                  <div>
                    <CardTitle className="text-base">{user.displayName}</CardTitle>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {user.bio && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {user.bio}
                  </p>
                )}
                
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">IP:</span>
                    <Badge variant="secondary">
                      {user.intellectualPoints}
                    </Badge>
                  </div>
                  
                  {user.badges.length > 0 && (
                    <div className="flex gap-1">
                      {user.badges.slice(0, 3).map((badge, index) => (
                        <Badge key={index} variant="outline">
                          {badge}
                        </Badge>
                      ))}
                      {user.badges.length > 3 && (
                        <Badge variant="outline">+{user.badges.length - 3}</Badge>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProfile(user.id)}
                  >
                    View Profile
                  </Button>
                  
                  {user.isFollowing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUnfollow(user.id)}
                    >
                      Unfollow
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => onFollow(user.id)}
                    >
                      Follow
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
