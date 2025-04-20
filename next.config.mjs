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
    unoptimized: true,
  },
  swcMinify: true,
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
  // For Vercel deployment
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
}

export default nextConfig
