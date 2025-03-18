'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../components/ui/Button';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            ChetnAI
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/mirror" className="text-gray-600 hover:text-primary-600">
              Mirror Mode
            </Link>
            <Link href="/notes" className="text-gray-600 hover:text-primary-600">
              Notes
            </Link>
            <Link href="/social" className="text-gray-600 hover:text-primary-600">
              Social
            </Link>
            <Link href="/rewards" className="text-gray-600 hover:text-primary-600">
              Rewards
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Log In
            </Button>
            <Button size="sm">
              Sign Up
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ChetnAI</h3>
              <p className="text-gray-600">
                Your AI-powered intellectual workspace for organizing, tracking, and evolving your thoughts.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/mirror" className="text-gray-600 hover:text-primary-600">
                    Mirror Mode
                  </Link>
                </li>
                <li>
                  <Link href="/notes" className="text-gray-600 hover:text-primary-600">
                    Notes Management
                  </Link>
                </li>
                <li>
                  <Link href="/social" className="text-gray-600 hover:text-primary-600">
                    Social Features
                  </Link>
                </li>
                <li>
                  <Link href="/rewards" className="text-gray-600 hover:text-primary-600">
                    Rewards System
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary-600">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} ChetnAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
