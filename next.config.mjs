/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['fkuzdgnidoiksdrulcav.supabase.co'],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // For Vercel deployment
  output: 'standalone',
}

export default nextConfig
