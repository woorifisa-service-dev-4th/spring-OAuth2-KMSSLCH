'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

const HomePage = () => {
  const [authCode, setAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [protectedResource, setProtectedResource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  // URL에서 인증 코드 가져오기
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      setAuthCode(code);
    }
  }, [searchParams]);

  // authCode가 설정되면 자동으로 exchangeCodeForToken 실행
  useEffect(() => {
    if (authCode) {
      exchangeCodeForToken(authCode);
    }
  }, [authCode]);

  useEffect(() => {
    if(accessToken) {
      getProtectedResource(accessToken);
    }
  }, [accessToken]);

  // 인증 코드 요청 함수
  const requestAuthCode = async () => {
    try {
      setLoading(true);
      setError(null);

      const authUrl = `http://localhost:9000/oauth2/authorize?response_type=code&client_id=oauth2-client-app&scope=openid%20read%20write&redirect_uri=http://127.0.0.1:3000`;

      console.log('리다이렉트 시작...', authUrl);
      window.location.href = authUrl;
    } catch (err) {
      console.error('인증 요청 오류:', err);
      setError('인증 서버에 연결할 수 없습니다.');
      setLoading(false);
    }
  };

  // 인증 코드 -> 액세스 토큰 교환 함수
  const exchangeCodeForToken = async (code) => {
    try {
      setLoading(true);
      setError(null);

      const tokenEndpoint = '/api/oauth2/token';
      const clientId = 'oauth2-client-app';
      const clientSecret = 'secret';
      const redirectUri = 'http://127.0.0.1:3000';

      const response = await axios.post(tokenEndpoint, new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        withCredentials: true // CORS 쿠키 인증 필요시
      });

      console.log('액세스 토큰 응답:', response.data);
      setAccessToken(response.data.access_token);

    } catch (err) {
      console.error('토큰 교환 오류:', err.response?.data || err.message);
      setError('인증 코드를 토큰으로 교환하는 중 오류가 발생했습니다.');
    }
  };

  const getProtectedResource = async (accessToken) => {
    try {
      setLoading(true);
      setError(null);

      const resourceServerEndpoint = '/resources'
      
      console.log(accessToken);

      const response = await axios.get(resourceServerEndpoint, new URLSearchParams({
      }), {
        headers: {
          "authorization" : `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      });

      console.log(response.data);

      setProtectedResource(response.data);
    } catch (err) {
      console.error('데이터 패칭 오류:', err.response?.data || err.message);
      setError('리소스 서버로부터 데이터를 가져 오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">OAuth2 인증 예제</h1>

        <div className="mb-6 flex justify-center">
          <button
            onClick={requestAuthCode}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '처리 중...' : '인증 코드 요청'}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
            {error}
          </div>
        )}

        {authCode && (
          <div className="border border-gray-200 rounded-md p-4 bg-gray-50">
            <h2 className="font-bold text-lg mb-2">인증 코드 발급 성공!</h2>
            <p className="text-gray-700 mb-2">발급된 인증 코드:</p>
            <div className="bg-gray-100 p-3 rounded-md font-mono text-sm break-all">
              {authCode}
            </div>
          </div>
        )}

        {accessToken && (
          <div className="mt-4 border border-gray-200 rounded-md p-4 bg-green-50">
            <h2 className="font-bold text-lg mb-2">액세스 토큰</h2>
            <div className="bg-green-100 p-3 rounded-md font-mono text-sm break-all">
              {accessToken}
            </div>
          </div>
        )}

        {/* {protectedResource && (
          <div className="mt-4 border border-gray-200 rounded-md p-4 bg-green-50">
          <h2 className="font-bold text-lg mb-2">액세스 토큰</h2>
          <div className="bg-green-100 p-3 rounded-md font-mono text-sm break-all">
            {protectedResource}
          </div>
        </div>
        )} */}

      </div>
    </div>
  );
};

export default HomePage;