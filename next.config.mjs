// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async middleware(req) {
      // Import and apply authentication middleware
      const { authMiddleware } = await import('./src/middleware/authMiddleware');
      return authMiddleware(req);
    }
  };
  
  export default nextConfig;