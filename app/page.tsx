'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function HomePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to ChetnAI</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your AI-powered intellectual workspace for organizing, tracking, and evolving your thoughts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link href="/mirror" passHref>
          <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Mirror Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Reflect on your thoughts, identify contradictions, and engage in debates with AI personas.
              </p>
              <Button className="w-full">Explore Mirror Mode</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/notes" passHref>
          <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Create, organize, and manage your notes with categories and tags for easy retrieval.
              </p>
              <Button className="w-full">Manage Notes</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/social" passHref>
          <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Social</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Connect with like-minded thinkers, collaborate on projects, and engage in meaningful discussions.
              </p>
              <Button className="w-full">Join Community</Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/rewards" passHref>
          <Card className="h-full cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Track your intellectual progress, earn badges, and compete on the leaderboard.
              </p>
              <Button className="w-full">View Rewards</Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">How ChetnAI Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl mx-auto mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">Capture Your Thoughts</h3>
            <p className="text-gray-600">
              Create notes, mindmaps, and connections between your ideas in a structured way.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl mx-auto mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">Reflect and Evolve</h3>
            <p className="text-gray-600">
              Use Mirror Mode to identify contradictions and debate with AI personas to refine your thinking.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-2xl mx-auto mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">Collaborate and Grow</h3>
            <p className="text-gray-600">
              Share your ideas, collaborate with others, and earn intellectual points as you develop.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Elevate Your Thinking?</h2>
        <p className="text-gray-600 mb-6">
          Start your intellectual journey with ChetnAI today.
        </p>
        <Button size="lg">Get Started</Button>
      </div>
    </div>
  );
}
