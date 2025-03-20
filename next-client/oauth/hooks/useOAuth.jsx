import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useOAuthContext } from '@/app/context/OAuthProvider';

const useOAuth = () => {
  const { token, setToken } = useOAuthContext();

  const [authCode, setAuthCode] = useState(null);
  const [protectedResource, setProtectedResource] = useState(null);
  const [isTokenExpired, setTokenExpired] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  
  const hasFetchedToken = useRef(false);
  const hasFetchedResource = useRef(false);
  
  const router = useRouter();


    // 1. 인증 코드 요청
    const requestAuthCode = () => {
      const authUrl = process.env.NEXT_PUBLIC_AUTH_URI;
      
      console.log('리다이렉트 시작...', authUrl);
      window.location.href = authUrl;
    };

  // 2. URL에서 인증 코드 가져오기
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) setAuthCode(code);
  }, [searchParams]);

  // 3. 인증 코드가 설정되면 토큰 요청 실행
  useEffect(() => {
    if (authCode && !hasFetchedToken.current) {
      hasFetchedToken.current = true;
      exchangeCodeForToken(authCode);
    }
  }, [authCode]);

  useEffect(() => {
    if (isTokenExpired) {
      reacquireAccessToken(token.refreshToken);
    }

  }, [isTokenExpired]);

  const exchangeCodeForToken = async (code) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/oauth2/token', 
        new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          client_id: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET,
          redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI
        }), 
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );

      console.log('액세스 토큰 응답:', response.data);

      var token = {
        accessToken:response.data.access_token,
        refreshToken:response.data.refresh_token
      }

      setToken(token);
      setTokenExpired(false);
    } catch (err) {
      console.error('토큰 교환 오류:', err.response?.data || err.message);
      setError('인증 코드를 토큰으로 교환하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && !hasFetchedResource.current) {
      hasFetchedResource.current = true;
      getProtectedResource(token.accessToken);
    }
  }, [token]);

  const getProtectedResource = async (token) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('/resources', {
        headers: { Authorization: `Bearer ${token.accessToken}` }
      });

      console.log('보호된 리소스:', response.data);
      setProtectedResource(response.data);
      
      router.push('/dashboard');

    } catch (err) {
      console.error('리소스 가져오기 오류:', err.response?.data || err.message);
      setError('리소스 서버로부터 데이터를 가져오는 중 오류가 발생했습니다.');

      if (error.response?.status === "403") { // Access Token Expired
        setTokenExpired(true);
      }
    } finally {
      if (!isTokenExpired) {
      setLoading(false);
      }
    }
  };

  const reacquireAccessToken = async (token) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('', {
        headers: { Authorization: `Bearer ${token.accessToken}` }
      });

      console.log('보호된 리소스:', response.data);
      setProtectedResource(response.data);
      
      router.push('/dashboard');

    } catch (err) {
      console.error('리소스 가져오기 오류:', err.response?.data || err.message);
      setError('리소스 서버로부터 데이터를 가져오는 중 오류가 발생했습니다.');

      if (error.response?.status === "403") { // Access Token Expired
        setTokenExpired(true);
      }
    }
  }

  return { token, protectedResource, loading, error, requestAuthCode };
};

export default useOAuth;
