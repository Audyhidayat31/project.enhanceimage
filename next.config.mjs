/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Sharp is a native module and must run server-side only
  serverExternalPackages: ['sharp'],
  outputFileTracingRoot: process.cwd(),
}

export default nextConfig
