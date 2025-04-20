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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fkuzdgnidoiksdrulcav.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  swcMinify: true,
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
}

export default nextConfig
