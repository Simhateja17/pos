/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    '/retail': ['./retail-pos/**/*'],
    '/retail/src/[file]': ['./retail-pos/**/*'],
    '/pharmacy': ['./pharmacy-pos/**/*'],
    '/pharmacy/src/[file]': ['./pharmacy-pos/**/*'],
  },
};

export default nextConfig;
