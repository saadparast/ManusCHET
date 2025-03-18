'use client';

import React, { useState } from 'react';
import { CommunityFeed } from '../components/social/CommunityFeed';
import { UserProfile } from '../components/social/UserProfile';
import { CollaborationInvite } from '../components/social/CollaborationInvite';
import { LiveChat } from '../components/social/LiveChat';

export default function SocialPage() {
  const [activeView, setActiveView] = useState<'community' | 'profile' | 'invites' | 'chat'>('community');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  // Mock data for testing
  const mockUsers = [
    {
      id: 'u1',
      username: 'philosopherking',
      displayName: 'Philosopher King',
      avatar: undefined,
      bio: 'Exploring the intersection of philosophy, technology, and society.',
      intellectualPoints: 1250,
      badges: ['Deep Thinker', 'Consistent Contributor', 'Debate Champion'],
      isFollowing: true,
    },
    {
      id: 'u2',
      username: 'quantumthinker',
      displayName: 'Quantum Thinker',
      avatar: undefined,
      bio: 'Physics PhD student interested in quantum computing and its philosophical implications.',
      intellectualPoints: 980,
      badges: ['Science Enthusiast', 'Question Asker'],
      isFollowing: false,
    },
    {
      id: 'u3',
      username: 'ethicalai',
      displayName: 'Ethical AI',
      avatar: undefined,
      bio: 'Researching the ethical dimensions of artificial intelligence and machine learning.',
      intellectualPoints: 1540,
      badges: ['AI Expert', 'Thoughtful Commenter', 'Contradiction Resolver'],
      isFollowing: true,
    },
  ];

  const mockUserProfile = {
    id: 'u1',
    username: 'philosopherking',
    displayName: 'Philosopher King',
    avatar: undefined,
    bio: 'Exploring the intersection of philosophy, technology, and society. I believe in the power of rational discourse and collaborative thinking to solve complex problems.',
    intellectualPoints: 1250,
    badges: [
      {
        id: 'b1',
        name: 'Deep Thinker',
        description: 'Awarded for consistently producing thought-provoking content',
        icon: '🧠',
      },
      {
        id: 'b2',
        name: 'Consistent Contributor',
        description: 'Contributed valuable content for 30 consecutive days',
        icon: '📝',
      },
      {
        id: 'b3',
        name: 'Debate Champion',
        description: 'Won 10 high-quality debates with substantive arguments',
        icon: '🏆',
      },
    ],
    joinedDate: '2024-09-15T00:00:00Z',
    stats: {
      notes: 45,
      mindmaps: 12,
      debates: 28,
      followers: 156,
      following: 89,
    },
    isFollowing: false,
    isCurrentUser: true,
  };

  const mockInvites = [
    {
      id: 'i1',
      type: 'mindmap',
      title: 'Future of Education',
      description: 'Collaborative mindmap exploring how technology will transform education in the next decade',
      sender: {
        id: 'u2',
        displayName: 'Quantum Thinker',
        username: 'quantumthinker',
        avatar: undefined,
      },
      created_at: '2025-03-10T14:30:00Z',
      status: 'pending',
    },
    {
      id: 'i2',
      type: 'debate',
      title: 'AI Consciousness',
      description: 'A structured debate on whether artificial intelligence can ever be truly conscious',
      sender: {
        id: 'u3',
        displayName: 'Ethical AI',
        username: 'ethicalai',
        avatar: undefined,
      },
      created_at: '2025-03-05T09:15:00Z',
      status: 'accepted',
    },
    {
      id: 'i3',
      type: 'note',
      title: 'Bioethics Research',
      description: 'Collaborative note on emerging bioethical challenges in genetic engineering',
      sender: {
        id: 'u2',
        displayName: 'Quantum Thinker',
        username: 'quantumthinker',
        avatar: undefined,
      },
      created_at: '2025-03-01T11:45:00Z',
      status: 'declined',
    },
  ];

  const mockChatParticipants = [
    {
      id: 'u1',
      displayName: 'Philosopher King',
      username: 'philosopherking',
      avatar: undefined,
      isOnline: true,
    },
    {
      id: 'u2',
      displayName: 'Quantum Thinker',
      username: 'quantumthinker',
      avatar: undefined,
      isOnline: true,
    },
    {
      id: 'u3',
      displayName: 'Ethical AI',
      username: 'ethicalai',
      avatar: undefined,
      isOnline: false,
    },
  ];

  const mockMessages = [
    {
      id: 'm1',
      sender: {
        id: 'u1',
        displayName: 'Philosopher King',
        username: 'philosopherking',
        avatar: undefined,
      },
      content: 'I think we should start by defining what we mean by consciousness in this context.',
      timestamp: '2025-03-15T10:00:00Z',
    },
    {
      id: 'm2',
      sender: {
        id: 'u2',
        displayName: 'Quantum Thinker',
        username: 'quantumthinker',
        avatar: undefined,
      },
      content: 'Good point. From a quantum perspective, consciousness might be related to quantum coherence in neural microtubules.',
      timestamp: '2025-03-15T10:02:00Z',
    },
    {
      id: 'm3',
      sender: {
        id: 'u3',
        displayName: 'Ethical AI',
        username: 'ethicalai',
        avatar: undefined,
      },
      content: 'That\'s an interesting theory, but I think we should also consider the philosophical aspects of qualia and subjective experience.',
      timestamp: '2025-03-15T10:05:00Z',
    },
  ];

  // Mock handlers
  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
    setActiveView('profile');
  };

  const handleFollow = (userId: string) => {
    console.log('Following user:', userId);
    // In a real implementation, this would call an API
  };

  const handleUnfollow = (userId: string) => {
    console.log('Unfollowing user:', userId);
    // In a real implementation, this would call an API
  };

  const handleEditProfile = () => {
    console.log('Editing profile');
    // In a real implementation, this would navigate to an edit profile page
  };

  const handleAcceptInvite = (inviteId: string) => {
    console.log('Accepting invite:', inviteId);
    // In a real implementation, this would call an API
  };

  const handleDeclineInvite = (inviteId: string) => {
    console.log('Declining invite:', inviteId);
    // In a real implementation, this would call an API
  };

  const handleViewInvite = (inviteId: string) => {
    console.log('Viewing invite details:', inviteId);
    // In a real implementation, this would navigate to the invite details
  };

  const handleSendMessage = async (content: string) => {
    console.log('Sending message:', content);
    // In a real implementation, this would call an API
    return Promise.resolve();
  };

  const handleLeaveChat = () => {
    setActiveView('community');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Social</h1>
      
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeView === 'community'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveView('community')}
        >
          Community
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeView === 'invites'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveView('invites')}
        >
          Invites
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeView === 'chat'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveView('chat')}
        >
          Chat
        </button>
      </div>
      
      {activeView === 'community' && (
        <CommunityFeed
          users={mockUsers}
          onViewProfile={handleViewProfile}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
        />
      )}
      
      {activeView === 'profile' && (
        <UserProfile
          user={mockUserProfile}
          onFollow={handleFollow}
          onUnfollow={handleUnfollow}
          onEditProfile={handleEditProfile}
        />
      )}
      
      {activeView === 'invites' && (
        <CollaborationInvite
          invites={mockInvites}
          onAccept={handleAcceptInvite}
          onDecline={handleDeclineInvite}
          onViewInvite={handleViewInvite}
        />
      )}
      
      {activeView === 'chat' && (
        <LiveChat
          chatId="chat1"
          title="AI Consciousness Discussion"
          participants={mockChatParticipants}
          messages={mockMessages}
          onSendMessage={handleSendMessage}
          onLeaveChat={handleLeaveChat}
        />
      )}
    </div>
  );
}
