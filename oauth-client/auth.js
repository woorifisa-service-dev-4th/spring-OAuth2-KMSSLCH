export const authOptions = {
  providers: [
    {
      id: 'custom-oauth',
      name: 'Custom OAuth',
      type: 'oauth',
      version: '2.0',
      authorization: {
        url: process.env.AUTH_AUTHORIZATION_URL,
        params: {
          scope: 'openid read write',
          redirect_uri: 'http://localhost:3000/api/auth/callback/custom-oauth', // ✅ 추가
        },
      },
      token: process.env.AUTH_TOKEN_URL,
      userinfo: process.env.AUTH_USERINFO_URL,
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      checks: ['pkce', 'state'], // ✅ PKCE 활성화
      issuer: 'http://localhost:9000', // ✅ 추가
      wellKnown: 'http://localhost:9000/.well-known/openid-configuration',
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.preferred_username,
          email: profile.email,
        };
      },
    },
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(`[next-auth debug] Redirecting to: ${url}`);

      // ✅ 이미 로그인 페이지에 있으면 중첩 방지
      // 로그인 성공 후 대시보드로 자동 이동
      if (url === baseUrl || url.startsWith(`${baseUrl}/auth/login`)) {
        return `${baseUrl}/dashboard`;
      }

      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login', // 로그인 페이지 명확히 지정
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // 디버깅 활성화
};
