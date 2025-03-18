'use client';

import React, { useState } from 'react';
import { ContradictionAlerts } from '../components/mirror/ContradictionAlerts';
import { AIPersonaSelector } from '../components/mirror/AIPersonaSelector';
import { DebateMode } from '../components/mirror/DebateMode';
import { DebateInterface } from '../components/mirror/DebateInterface';

export default function MirrorModePage() {
  const [activeTab, setActiveTab] = useState<'contradictions' | 'debates' | 'debate-session'>('contradictions');
  const [selectedDebateId, setSelectedDebateId] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<any | null>(null);

  // Mock data for testing
  const mockContradictions = [
    {
      id: '1',
      note1: {
        id: 'n1',
        title: 'Climate Change Solutions',
        content: 'Nuclear energy is the most efficient solution to climate change as it produces zero carbon emissions during operation.',
        created_at: '2025-01-15T10:30:00Z',
      },
      note2: {
        id: 'n2',
        title: 'Renewable Energy',
        content: 'Solar and wind power are the only viable long-term solutions to climate change due to their sustainability and lack of waste products.',
        created_at: '2025-02-20T14:45:00Z',
      },
      description: 'Contradiction in preferred energy solutions for climate change',
      status: 'unresolved',
      created_at: '2025-02-25T09:15:00Z',
    },
    {
      id: '2',
      note1: {
        id: 'n3',
        title: 'AI Ethics',
        content: 'AI development should be regulated by international bodies to ensure ethical standards are maintained globally.',
        created_at: '2025-01-10T11:20:00Z',
      },
      note2: {
        id: 'n4',
        title: 'Technology Innovation',
        content: 'Excessive regulation of AI will stifle innovation and prevent beneficial technologies from being developed.',
        created_at: '2025-02-05T16:30:00Z',
      },
      description: 'Contradiction in approach to AI regulation and development',
      status: 'unresolved',
      created_at: '2025-02-10T13:45:00Z',
    },
  ];

  const mockPersonas = [
    {
      id: 'p1',
      name: 'Socratic Questioner',
      description: 'Challenges your assumptions through thoughtful questions, helping you examine your beliefs more deeply.',
      avatar: undefined,
      style: 'Philosophical',
    },
    {
      id: 'p2',
      name: 'Devil\'s Advocate',
      description: 'Presents counterarguments to your positions, helping you strengthen your reasoning and consider alternative viewpoints.',
      avatar: undefined,
      style: 'Challenging',
    },
    {
      id: 'p3',
      name: 'Systems Thinker',
      description: 'Analyzes problems through interconnected systems, helping you see broader patterns and relationships.',
      avatar: undefined,
      style: 'Analytical',
    },
  ];

  const mockDebates = [
    {
      id: 'd1',
      title: 'The Future of Work',
      description: 'Exploring how automation and AI will transform employment and society',
      status: 'active',
      created_at: '2025-02-01T10:00:00Z',
      persona: {
        id: 'p1',
        name: 'Socratic Questioner',
      },
      messageCount: 12,
    },
    {
      id: 'd2',
      title: 'Digital Privacy',
      description: 'Debating the balance between security and privacy in the digital age',
      status: 'completed',
      created_at: '2025-01-15T14:30:00Z',
      persona: {
        id: 'p2',
        name: 'Devil\'s Advocate',
      },
      messageCount: 24,
      score: 85,
    },
  ];

  // Mock handlers
  const handleResolveContradiction = (id: string) => {
    console.log('Resolving contradiction:', id);
  };

  const handleDismissContradiction = (id: string) => {
    console.log('Dismissing contradiction:', id);
  };

  const handleSelectPersona = (persona: any) => {
    setSelectedPersona(persona);
    console.log('Selected persona:', persona);
  };

  const handleStartDebate = () => {
    if (selectedPersona) {
      setActiveTab('debate-session');
    } else {
      alert('Please select a persona first');
    }
  };

  const handleSendMessage = async (content: string) => {
    console.log('Sending message:', content);
    // In a real implementation, this would call an API
    return Promise.resolve();
  };

  const handleEndDebate = () => {
    setActiveTab('debates');
    setSelectedPersona(null);
  };

  const handleContinueDebate = (debateId: string) => {
    setSelectedDebateId(debateId);
    // In a real implementation, we would fetch the persona for this debate
    setSelectedPersona(mockPersonas[0]);
    setActiveTab('debate-session');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Mirror Mode</h1>
      
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'contradictions'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('contradictions')}
        >
          Contradictions
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'debates'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('debates')}
        >
          Debates
        </button>
      </div>
      
      {activeTab === 'contradictions' && (
        <ContradictionAlerts
          contradictions={mockContradictions}
          onResolve={handleResolveContradiction}
          onDismiss={handleDismissContradiction}
        />
      )}
      
      {activeTab === 'debates' && (
        <div className="space-y-8">
          <AIPersonaSelector
            personas={mockPersonas}
            onSelect={handleSelectPersona}
            selectedPersonaId={selectedPersona?.id}
          />
          
          {selectedPersona && (
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                onClick={handleStartDebate}
              >
                Start New Debate with {selectedPersona.name}
              </button>
            </div>
          )}
          
          <DebateInterface
            debates={mockDebates}
            onStartDebate={() => setActiveTab('debates')}
            onContinueDebate={handleContinueDebate}
            onViewDebate={(id) => console.log('View debate:', id)}
          />
        </div>
      )}
      
      {activeTab === 'debate-session' && selectedPersona && (
        <DebateMode
          debateId={selectedDebateId || 'new-debate'}
          topic={selectedDebateId ? 'Continuing Debate' : 'New Debate Topic'}
          persona={{
            id: selectedPersona.id,
            name: selectedPersona.name,
            avatar: selectedPersona.avatar,
          }}
          initialStatement="I believe that..."
          onSendMessage={handleSendMessage}
          onEndDebate={handleEndDebate}
        />
      )}
    </div>
  );
}
