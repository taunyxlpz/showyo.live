/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => ([
    { source: '/player', headers: [{ key: 'Cache-Control', value: 'no-store' }] },
    { source: '/api/(.*)', headers: [{ key: 'Cache-Control', value: 'no-store' }] }
  ])
};
export default nextConfig;
