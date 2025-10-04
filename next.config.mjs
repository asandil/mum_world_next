/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img1.wsimg.com',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port:"",
        pathname: "/**",
        search: ""
      }
    ],
  },
};

export default nextConfig;
