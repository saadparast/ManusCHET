'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  displayName: string;
  avatar?: string;
  intellectualPoints: number;
  badgeCount: number;
  isCurrentUser: boolean;
}

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  timeframe: 'weekly' | 'monthly' | 'allTime';
  onChangeTimeframe: (timeframe: 'weekly' | 'monthly' | 'allTime') => void;
  onViewProfile: (userId: string) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  entries,
  timeframe,
  onChangeTimeframe,
  onViewProfile,
}) => {
  // Get rank badge color
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-800';
    if (rank === 2) return 'bg-gray-200 text-gray-800';
    if (rank === 3) return 'bg-amber-100 text-amber-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Intellectual Points Leaderboard</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === 'weekly'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => onChangeTimeframe('weekly')}
          >
            Weekly
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === 'monthly'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => onChangeTimeframe('monthly')}
          >
            Monthly
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              timeframe === 'allTime'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => onChangeTimeframe('allTime')}
          >
            All Time
          </button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            {timeframe === 'weekly'
              ? 'This Week\'s Top Thinkers'
              : timeframe === 'monthly'
              ? 'This Month\'s Top Thinkers'
              : 'All-Time Top Thinkers'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {entries.length === 0 ? (
              <div className="text-center p-4">
                <p className="text-gray-500">No data available</p>
              </div>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-50 ${
                    entry.isCurrentUser ? 'bg-primary-50' : ''
                  }`}
                  onClick={() => onViewProfile(entry.id)}
                >
                  <div className="w-8 flex justify-center">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium ${getRankColor(
                        entry.rank
                      )}`}
                    >
                      {entry.rank}
                    </span>
                  </div>
                  
                  <div className="flex items-center flex-grow ml-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {entry.avatar ? (
                        <img
                          src={entry.avatar}
                          alt={entry.displayName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm">
                          {entry.displayName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    <div className="ml-3">
                      <div className="font-medium text-sm">
                        {entry.displayName}
                        {entry.isCurrentUser && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        @{entry.username}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">{entry.intellectualPoints}</div>
                      <div className="text-xs text-gray-500">IP</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">{entry.badgeCount}</div>
                      <div className="text-xs text-gray-500">Badges</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
