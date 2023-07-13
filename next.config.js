/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['drive.google.com', '**.googleusercontent.com']
  }
}

module.exports = {
    ...nextConfig
}
