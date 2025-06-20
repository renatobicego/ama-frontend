/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['drive.google.com', '**.googleusercontent.com', 'firebasestorage.googleapis.com']
  }
}

module.exports = {
    ...nextConfig
}
