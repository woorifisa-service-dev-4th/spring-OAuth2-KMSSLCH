"use client";

import useOAuth from '@/hooks/useOAuth';

const Dashboard = () => {
  const { protectedResource, refreshToken, token } = useOAuth();

  return <div>Refresh Token : { token && token.refreshToken }</div>;
};

export default Dashboard;