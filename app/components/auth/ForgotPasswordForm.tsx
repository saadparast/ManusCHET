'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';

export const ForgotPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // This would be replaced with actual Supabase authentication
      // const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      // if (error) throw error;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send password reset email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password
        </CardDescription>
      </CardHeader>
      {success ? (
        <CardContent className="space-y-4">
          <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-600 text-sm">
            Password reset link has been sent to your email address. Please check your inbox.
          </div>
          <div className="text-center">
            <Link href="/auth/login">
              <Button variant="link">Return to login</Button>
            </Link>
          </div>
        </CardContent>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Send Reset Link
            </Button>
            <p className="text-center text-sm text-gray-600">
              Remember your password?{' '}
              <Link href="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      )}
    </Card>
  );
};
