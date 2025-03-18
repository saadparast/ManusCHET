'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

interface UserProfileProps {
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    bio?: string;
    intellectualPoints: number;
    badges: Array<{
      id: string;
      name: string;
      description: string;
      icon?: string;
    }>;
    joinedDate: string;
    stats: {
      notes: number;
      mindmaps: number;
      debates: number;
      followers: number;
      following: number;
    };
    isFollowing?: boolean;
    isCurrentUser: boolean;
  };
  onFollow: () => void;
  onUnfollow: () => void;
  onEditProfile?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onFollow,
  onUnfollow,
  onEditProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'mindmaps' | 'debates' | 'badges'>('notes');

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar
                size="lg"
                name={user.displayName}
                src={user.avatar}
              />
              <div>
                <CardTitle>{user.displayName}</CardTitle>
                <p className="text-gray-500">@{user.username}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Joined {formatDate(user.joinedDate)}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {user.isCurrentUser ? (
                <Button
                  variant="outline"
                  onClick={onEditProfile}
                >
                  Edit Profile
                </Button>
              ) : user.isFollowing ? (
                <Button
                  variant="outline"
                  onClick={onUnfollow}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  onClick={onFollow}
                >
                  Follow
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {user.bio && (
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-1">Bio</h3>
              <p className="text-gray-700">{user.bio}</p>
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 py-3 border-t border-b">
            <div className="text-center">
              <div className="text-2xl font-semibold">{user.intellectualPoints}</div>
              <div className="text-sm text-gray-500">Intellectual Points</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-semibold">{user.stats.notes}</div>
              <div className="text-sm text-gray-500">Notes</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-semibold">{user.stats.mindmaps}</div>
              <div className="text-sm text-gray-500">Mindmaps</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-semibold">{user.stats.debates}</div>
              <div className="text-sm text-gray-500">Debates</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-semibold">{user.stats.followers}</div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-semibold">{user.stats.following}</div>
              <div className="text-sm text-gray-500">Following</div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex border-b">
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'notes'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('notes')}
              >
                Notes
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'mindmaps'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('mindmaps')}
              >
                Mindmaps
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'debates'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('debates')}
              >
                Debates
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${
                  activeTab === 'badges'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('badges')}
              >
                Badges ({user.badges.length})
              </button>
            </div>
            
            <div className="py-4">
              {activeTab === 'badges' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {user.badges.length === 0 ? (
                    <p className="text-gray-500 col-span-full text-center py-8">
                      No badges earned yet
                    </p>
                  ) : (
                    user.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className="p-3 border rounded-md flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                          {badge.icon || '🏆'}
                        </div>
                        <div>
                          <h4 className="font-medium">{badge.name}</h4>
                          <p className="text-xs text-gray-500">
                            {badge.description}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {activeTab === 'notes'
                      ? 'Public notes will appear here'
                      : activeTab === 'mindmaps'
                      ? 'Public mindmaps will appear here'
                      : 'Debate history will appear here'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
