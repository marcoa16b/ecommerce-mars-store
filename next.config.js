/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "files.cdn.printful.com"
    ]
  }
}

module.exports = nextConfig
