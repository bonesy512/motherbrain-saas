'use client';

import React, { useEffect, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { GoogleButton } from './GoogleButton';

export type LoginMode = 'signin' | 'signup';

export function Login({ mode }: { mode: LoginMode }) {
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === 'signin' ? 'Sign in to Motherbrain' : 'Sign up for Motherbrain'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {mode === 'signin'
            ? 'Sign in to access your account'
            : 'Create a new account to get started'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    {error === 'OAuthSignin'
                      ? 'Error signing in with Google. Please try again.'
                      : 'An error occurred. Please try again.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-6">
            <div>
              <div className="mt-1">
                <GoogleButton />
              </div>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">
                    {mode === 'signin'
                      ? 'New to our platform?'
                      : 'Already have an account?'}
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={mode === 'signin' ? '/sign-up' : '/sign-in'}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-orange-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  {mode === 'signin' ? 'Create an account' : 'Sign in'}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}