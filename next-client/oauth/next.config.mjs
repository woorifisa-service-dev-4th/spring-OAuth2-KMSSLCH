// next.config.mjs (수정된 코드)
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/oauth2/token",
          destination: "http://localhost:9000/oauth2/token",
        },
        {
          source: "/api/oauth2/authorize",
          destination: "http://localhost:9000/oauth2/authorize",
        },
        {
          source: "/resources",
          destination:"http://localhost:3001/resources"
        }
      ];
    },
  };
  
  export default nextConfig;
  