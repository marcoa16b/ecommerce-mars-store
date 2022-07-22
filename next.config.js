/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "files.cdn.printful.com",
      "lh3.googleusercontent.com"
    ]
  }
}

module.exports = nextConfig
