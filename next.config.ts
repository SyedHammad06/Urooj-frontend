import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: [
            'utfs.io',
            '147.93.102.224:5000',
            'gwyjtnsbbf.ufs.sh',
            'shorturl.at',
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: 'upgrade-insecure-requests',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
