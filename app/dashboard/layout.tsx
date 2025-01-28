'use client';

import SideNav from '../ui/sidenav/sidenav';
import Navigation from '../ui/nav/nav';
import { Roboto } from 'next/font/google';
import { useSearchParams } from 'next/navigation';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const query = useSearchParams();
    const id = query.get('id');

    return (
        <html lang='en'>
            <body className={`${roboto.className}`}>
                <Navigation id={id} />
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                    }}
                >
                    <SideNav />
                    {children}
                </div>
            </body>
        </html>
    );
}
