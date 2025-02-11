import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Suspense } from 'react';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
    title: 'Urooj Business Solutions',
    description: 'Introducing Hauna - A Syllabus for the Pre-schools!',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={`${roboto.className}`}>
                <Suspense>{children}</Suspense>
            </body>
        </html>
    );
}
