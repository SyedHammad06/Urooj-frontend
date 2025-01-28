import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['utfs.io'],
    },
};

module.exports = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
