'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';

interface HeaderProps {
  user?: {
    id: string;
    username: string;
    avatar_url?: string;
    intellectual_points: number;
    level: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Mindmaps', href: '/mindmaps' },
    { label: 'Notes', href: '/notes' },
    { label: 'Mirror Mode', href: '/mirror' },
    { label: 'Social', href: '/social' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary-600">ChetnAI</span>
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === item.href
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <Tooltip content={`${user.intellectual_points} Intellectual Points`}>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">
                      {user.level}
                    </Badge>
                    <span className="text-sm font-medium text-gray-700">
                      {user.intellectual_points} IP
                    </span>
                  </div>
                </Tooltip>
                <Link href="/rewards">
                  <Button variant="ghost" size="sm">
                    Rewards
                  </Button>
                </Link>
                <div className="relative">
                  <Link href="/profile">
                    <Avatar 
                      src={user.avatar_url} 
                      alt={user.username} 
                      fallback={user.username} 
                      size="md" 
                    />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  pathname === item.href
                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Avatar 
                    src={user.avatar_url} 
                    alt={user.username} 
                    fallback={user.username} 
                    size="md" 
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.username}</div>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">
                      {user.level}
                    </Badge>
                    <span className="text-sm font-medium text-gray-500">
                      {user.intellectual_points} IP
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-4">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
