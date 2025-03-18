'use client';

import React, { useState } from 'react';
import { IPCounter } from '../components/rewards/IPCounter';
import { BadgeDisplay } from '../components/rewards/BadgeDisplay';
import { LeaderboardView } from '../components/rewards/LeaderboardView';
import { ProgressTracker } from '../components/rewards/ProgressTracker';

export default function RewardsPage() {
  const [activeView, setActiveView] = useState<'overview' | 'badges' | 'leaderboard' | 'progress'>('overview');
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly');

  // Mock data for testing
  const mockUserStats = {
    intellectualPoints: 1250,
    level: 5,
    nextLevelPoints: 1500,
    recentActivity: [
      {
        id: 'a1',
        action: 'Created a new mindmap',
        points: 25,
        timestamp: '2025-03-15T14:30:00Z',
      },
      {
        id: 'a2',
        action: 'Resolved a contradiction',
        points: 50,
        timestamp: '2025-03-14T10:15:00Z',
      },
      {
        id: 'a3',
        action: 'Completed a debate',
        points: 75,
        timestamp: '2025-03-12T16:45:00Z',
      },
      {
        id: 'a4',
        action: 'Daily login streak (7 days)',
        points: 15,
        timestamp: '2025-03-10T09:00:00Z',
      },
    ],
  };

  const mockBadges = [
    {
      id: 'b1',
      name: 'Deep Thinker',
      description: 'Awarded for consistently producing thought-provoking content',
      icon: '🧠',
      category: 'Content Creation',
      earned: true,
      earnedDate: '2025-02-15T00:00:00Z',
    },
    {
      id: 'b2',
      name: 'Consistent Contributor',
      description: 'Contributed valuable content for 30 consecutive days',
      icon: '📝',
      category: 'Engagement',
      earned: true,
      earnedDate: '2025-01-30T00:00:00Z',
    },
    {
      id: 'b3',
      name: 'Debate Champion',
      description: 'Won 10 high-quality debates with substantive arguments',
      icon: '🏆',
      category: 'Debate',
      earned: true,
      earnedDate: '2025-03-05T00:00:00Z',
    },
    {
      id: 'b4',
      name: 'Contradiction Resolver',
      description: 'Successfully resolved 25 contradictions in your thinking',
      icon: '🔄',
      category: 'Mirror Mode',
      earned: false,
      progress: {
        current: 18,
        required: 25,
      },
    },
    {
      id: 'b5',
      name: 'Community Leader',
      description: 'Reached 100 followers and maintained high engagement',
      icon: '👥',
      category: 'Social',
      earned: false,
      progress: {
        current: 65,
        required: 100,
      },
    },
    {
      id: 'b6',
      name: 'Knowledge Explorer',
      description: 'Created mindmaps covering 10 different domains of knowledge',
      icon: '🔍',
      category: 'Exploration',
      earned: false,
      progress: {
        current: 7,
        required: 10,
      },
    },
  ];

  const mockLeaderboard = [
    {
      id: 'u1',
      rank: 1,
      username: 'ethicalai',
      displayName: 'Ethical AI',
      avatar: undefined,
      intellectualPoints: 1540,
      badgeCount: 8,
      isCurrentUser: false,
    },
    {
      id: 'u2',
      rank: 2,
      username: 'philosopherking',
      displayName: 'Philosopher King',
      avatar: undefined,
      intellectualPoints: 1250,
      badgeCount: 6,
      isCurrentUser: true,
    },
    {
      id: 'u3',
      rank: 3,
      username: 'systemsthinker',
      displayName: 'Systems Thinker',
      avatar: undefined,
      intellectualPoints: 1180,
      badgeCount: 5,
      isCurrentUser: false,
    },
    {
      id: 'u4',
      rank: 4,
      username: 'quantumthinker',
      displayName: 'Quantum Thinker',
      avatar: undefined,
      intellectualPoints: 980,
      badgeCount: 4,
      isCurrentUser: false,
    },
    {
      id: 'u5',
      rank: 5,
      username: 'creativemind',
      displayName: 'Creative Mind',
      avatar: undefined,
      intellectualPoints: 920,
      badgeCount: 5,
      isCurrentUser: false,
    },
  ];

  const mockGoals = [
    {
      id: 'g1',
      title: 'Create 5 Mindmaps',
      description: 'Create five interconnected mindmaps on related topics',
      progress: 3,
      target: 5,
      reward: 100,
      completed: false,
      category: 'Content Creation',
    },
    {
      id: 'g2',
      title: 'Resolve 10 Contradictions',
      description: 'Find and resolve ten contradictions in your thinking',
      progress: 7,
      target: 10,
      reward: 150,
      completed: false,
      category: 'Mirror Mode',
    },
    {
      id: 'g3',
      title: 'Complete 3 Debates',
      description: 'Engage in and complete three debates with AI personas',
      progress: 3,
      target: 3,
      reward: 75,
      completed: true,
      category: 'Debate',
    },
    {
      id: 'g4',
      title: 'Daily Login Streak',
      description: 'Log in for 7 consecutive days',
      progress: 7,
      target: 7,
      reward: 50,
      completed: true,
      category: 'Engagement',
    },
    {
      id: 'g5',
      title: 'Connect with 10 Users',
      description: 'Follow and engage with ten other users',
      progress: 6,
      target: 10,
      reward: 75,
      completed: false,
      category: 'Social',
    },
  ];

  // Mock handlers
  const handleViewBadgeDetails = (badgeId: string) => {
    console.log('Viewing badge details:', badgeId);
    // In a real implementation, this would show a modal or navigate to badge details
  };

  const handleChangeTimeframe = (newTimeframe: 'weekly' | 'monthly' | 'allTime') => {
    setTimeframe(newTimeframe);
    console.log('Changed timeframe to:', newTimeframe);
    // In a real implementation, this would fetch new leaderboard data
  };

  const handleViewProfile = (userId: string) => {
    console.log('Viewing profile:', userId);
    // In a real implementation, this would navigate to the user profile
  };

  const handleViewGoalDetails = (goalId: string) => {
    console.log('Viewing goal details:', goalId);
    // In a real implementation, this would show a modal or navigate to goal details
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Rewards & Progress</h1>
      
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeView === 'overview'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeView === 'badges'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveView('badges')}
        >
          Badges
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeView === 'leaderboard'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveView('leaderboard')}
        >
          Leaderboard
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeView === 'progress'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveView('progress')}
        >
          Goals
        </button>
      </div>
      
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <IPCounter
              intellectualPoints={mockUserStats.intellectualPoints}
              level={mockUserStats.level}
              nextLevelPoints={mockUserStats.nextLevelPoints}
              recentActivity={mockUserStats.recentActivity}
            />
          </div>
          
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Recent Badges</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockBadges
                    .filter(badge => badge.earned)
                    .slice(0, 3)
                    .map(badge => (
                      <div
                        key={badge.id}
                        className="p-4 border rounded-md flex items-center gap-3 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleViewBadgeDetails(badge.id)}
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                          {badge.icon || '🏆'}
                        </div>
                        <div>
                          <h4 className="font-medium">{badge.name}</h4>
                          <p className="text-xs text-gray-500">
                            {badge.category}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-4 text-center">
                  <button
                    className="text-primary-600 hover:underline"
                    onClick={() => setActiveView('badges')}
                  >
                    View All Badges
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Current Goals</h3>
                <div className="space-y-3">
                  {mockGoals
                    .filter(goal => !goal.completed)
                    .slice(0, 3)
                    .map(goal => (
                      <div
                        key={goal.id}
                        className="p-4 border rounded-md cursor-pointer hover:bg-gray-50"
                        onClick={() => handleViewGoalDetails(goal.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{goal.title}</h4>
                          <span className="text-sm text-gray-500">
                            {goal.progress} / {goal.target}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                          <div
                            className="bg-primary-500 h-1.5 rounded-full"
                            style={{
                              width: `${Math.min((goal.progress / goal.target) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {goal.description}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-4 text-center">
                  <button
                    className="text-primary-600 hover:underline"
                    onClick={() => setActiveView('progress')}
                  >
                    View All Goals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeView === 'badges' && (
        <BadgeDisplay
          badges={mockBadges}
          onViewBadgeDetails={handleViewBadgeDetails}
        />
      )}
      
      {activeView === 'leaderboard' && (
        <LeaderboardView
          entries={mockLeaderboard}
          timeframe={timeframe}
          onChangeTimeframe={handleChangeTimeframe}
          onViewProfile={handleViewProfile}
        />
      )}
      
      {activeView === 'progress' && (
        <ProgressTracker
          intellectualPoints={mockUserStats.intellectualPoints}
          level={mockUserStats.level}
          nextLevelPoints={mockUserStats.nextLevelPoints}
          goals={mockGoals}
          onViewGoalDetails={handleViewGoalDetails}
        />
      )}
    </div>
  );
}
