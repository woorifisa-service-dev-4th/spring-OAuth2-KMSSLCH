'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">로그인</h1>
        <button 
          onClick={() => signIn('custom-oauth', { callbackUrl: '/' })}
          className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-200 text-white font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          OAuth 로그인
        </button>
      </div>
    </div>
  );
}