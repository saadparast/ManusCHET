'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category: string;
  earned: boolean;
  earnedDate?: string;
  progress?: {
    current: number;
    required: number;
  };
}

interface BadgeDisplayProps {
  badges: Badge[];
  onViewBadgeDetails: (badgeId: string) => void;
}

export const BadgeDisplay: React.FC<BadgeDisplayProps> = ({
  badges,
  onViewBadgeDetails,
}) => {
  const [filter, setFilter] = React.useState<'all' | 'earned' | 'unearned'>('all');
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(
    new Set(badges.map(badge => badge.category))
  );

  // Filter badges based on selected filters
  const filteredBadges = badges.filter(badge => {
    const matchesEarnedFilter = 
      filter === 'all' || 
      (filter === 'earned' && badge.earned) || 
      (filter === 'unearned' && !badge.earned);
    
    const matchesCategoryFilter = 
      categoryFilter === null || 
      badge.category === categoryFilter;
    
    return matchesEarnedFilter && matchesCategoryFilter;
  });

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Badges</h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'earned'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('earned')}
          >
            Earned
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'unearned'
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('unearned')}
          >
            Unearned
          </button>
        </div>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              categoryFilter === null
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => setCategoryFilter(null)}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`px-3 py-1 text-sm rounded-md ${
                categoryFilter === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {filteredBadges.length === 0 ? (
        <div className="text-center p-8 border border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500">No badges found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBadges.map(badge => (
            <Card
              key={badge.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                !badge.earned ? 'opacity-70' : ''
              }`}
              onClick={() => onViewBadgeDetails(badge.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{badge.name}</CardTitle>
                  <Badge variant={badge.earned ? 'success' : 'outline'}>
                    {badge.earned ? 'Earned' : 'Unearned'}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  {badge.category}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                    {badge.icon || '🏆'}
                  </div>
                  <p className="text-sm text-gray-600">{badge.description}</p>
                </div>

                {badge.earned && badge.earnedDate && (
                  <div className="text-xs text-gray-500">
                    Earned on {formatDate(badge.earnedDate)}
                  </div>
                )}

                {!badge.earned && badge.progress && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>
                        {badge.progress.current} / {badge.progress.required}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-primary-500 h-1.5 rounded-full"
                        style={{
                          width: `${Math.min(
                            (badge.progress.current / badge.progress.required) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
