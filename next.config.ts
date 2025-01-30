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
                        value: "default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'; img-src http: https: data:; font-src https: data:",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
