'use client';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}
    >
      <h1>로그인</h1>
      <button onClick={() => signIn('custom-oauth', { callbackUrl: '/' })}>OAuth 로그인</button>
    </div>
  );
}
