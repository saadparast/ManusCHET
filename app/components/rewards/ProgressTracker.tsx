'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ProgressTrackerProps {
  intellectualPoints: number;
  level: number;
  nextLevelPoints: number;
  goals: Array<{
    id: string;
    title: string;
    description: string;
    progress: number;
    target: number;
    reward: number;
    completed: boolean;
    category: string;
  }>;
  onViewGoalDetails: (goalId: string) => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  intellectualPoints,
  level,
  nextLevelPoints,
  goals,
  onViewGoalDetails,
}) => {
  const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(
    new Set(goals.map(goal => goal.category))
  );

  // Filter goals based on selected filters
  const filteredGoals = goals.filter(goal => {
    const matchesCompletionFilter = 
      filter === 'all' || 
      (filter === 'in-progress' && !goal.completed) || 
      (filter === 'completed' && goal.completed);
    
    const matchesCategoryFilter = 
      categoryFilter === null || 
      goal.category === categoryFilter;
    
    return matchesCompletionFilter && matchesCategoryFilter;
  });

  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalGoals = goals.length;
    if (totalGoals === 0) return 0;
    
    const completedGoals = goals.filter(goal => goal.completed).length;
    return Math.round((completedGoals / totalGoals) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Progress Tracker</h3>
        <div className="flex space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'in-progress' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('in-progress')}
          >
            In Progress
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('completed')}
          >
            Completed
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <div className="text-3xl font-bold">{intellectualPoints} IP</div>
            <Badge variant="secondary" className="text-sm">
              Level {level}
            </Badge>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress to Level {level + 1}</span>
              <span>{Math.round((intellectualPoints / nextLevelPoints) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary-500 h-2.5 rounded-full"
                style={{ width: `${Math.min((intellectualPoints / nextLevelPoints) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {intellectualPoints} / {nextLevelPoints} IP needed
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Goals Completed</span>
              <span>{calculateOverallProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${calculateOverallProgress()}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {goals.filter(goal => goal.completed).length} / {goals.length} goals completed
            </div>
          </div>
        </CardContent>
      </Card>

      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={categoryFilter === null ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setCategoryFilter(null)}
          >
            All Categories
          </Badge>
          {categories.map(category => (
            <Badge
              key={category}
              variant={categoryFilter === category ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {filteredGoals.length === 0 ? (
          <div className="text-center p-8 border border-dashed border-gray-300 rounded-md">
            <p className="text-gray-500">No goals found</p>
          </div>
        ) : (
          filteredGoals.map(goal => (
            <Card
              key={goal.id}
              className={`cursor-pointer hover:shadow-md transition-shadow ${
                goal.completed ? 'border-green-200' : ''
              }`}
              onClick={() => onViewGoalDetails(goal.id)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{goal.title}</h4>
                    <p className="text-sm text-gray-600">{goal.description}</p>
                  </div>
                  <Badge
                    variant={goal.completed ? 'success' : 'secondary'}
                  >
                    {goal.completed ? 'Completed' : 'In Progress'}
                  </Badge>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>
                      {goal.progress} / {goal.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        goal.completed ? 'bg-green-500' : 'bg-primary-500'
                      }`}
                      style={{
                        width: `${Math.min((goal.progress / goal.target) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-3 text-sm">
                  <span className="text-gray-500">{goal.category}</span>
                  <Badge variant="outline">
                    Reward: {goal.reward} IP
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
