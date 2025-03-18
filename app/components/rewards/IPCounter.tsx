'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface IPCounterProps {
  intellectualPoints: number;
  level: number;
  nextLevelPoints: number;
  recentActivity?: Array<{
    id: string;
    action: string;
    points: number;
    timestamp: string;
  }>;
}

export const IPCounter: React.FC<IPCounterProps> = ({
  intellectualPoints,
  level,
  nextLevelPoints,
  recentActivity = [],
}) => {
  // Calculate progress percentage to next level
  const progressPercentage = Math.min(
    Math.round((intellectualPoints / nextLevelPoints) * 100),
    100
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Intellectual Points</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <div className="text-3xl font-bold">{intellectualPoints}</div>
          <Badge variant="secondary" className="text-sm">
            Level {level}
          </Badge>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress to Level {level + 1}</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-500 h-2.5 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {intellectualPoints} / {nextLevelPoints} IP needed
          </div>
        </div>

        {recentActivity.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
            <div className="space-y-2 max-h-[200px] overflow-y-auto">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                >
                  <div>
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                  <Badge
                    variant={activity.points > 0 ? 'success' : 'destructive'}
                    className="text-xs"
                  >
                    {activity.points > 0 ? '+' : ''}
                    {activity.points} IP
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
