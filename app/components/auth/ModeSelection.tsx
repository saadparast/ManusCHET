'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';

interface ModeOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const ModeSelection: React.FC = () => {
  const [selectedMode, setSelectedMode] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const modes: ModeOption[] = [
    {
      id: 'solo',
      title: 'Solo Mode',
      description: 'Private workspace for personal reflection and thought organization.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      id: 'social',
      title: 'Social Mode',
      description: 'Share your thoughts and collaborate with the community.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
        </svg>
      ),
    },
  ];

  const handleContinue = async () => {
    if (!selectedMode) return;
    
    setIsLoading(true);
    
    try {
      // This would be replaced with actual API call to set user preference
      // await updateUserPreference({ mode: selectedMode });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Failed to set mode preference', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Mode</h1>
        <p className="mt-2 text-lg text-gray-600">
          Select how you want to use ChetnAI. You can change this later in settings.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {modes.map((mode) => (
          <Card 
            key={mode.id}
            className={`cursor-pointer transition-all ${
              selectedMode === mode.id 
                ? 'ring-2 ring-primary-500 shadow-lg' 
                : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedMode(mode.id)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{mode.icon}</div>
                <CardTitle className="mb-2">{mode.title}</CardTitle>
                <CardDescription>{mode.description}</CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          onClick={() => window.history.back()}
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedMode || isLoading}
          isLoading={isLoading}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
