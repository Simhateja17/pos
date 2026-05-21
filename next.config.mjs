/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/': ['./legacy_src/**/*'],
  },
};

export default nextConfig;
