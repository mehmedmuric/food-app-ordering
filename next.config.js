/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'foodApp.s3.amazonaws.com',
            },
        ]
    }
}

module.exports = nextConfig
