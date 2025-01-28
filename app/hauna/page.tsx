'use client';

import HaunaAbout from '../ui/hauna-about/hauna-about';
import HaunaHero from '../ui/hauna-hero/hauna-hero';
import Navigation from '../ui/nav/nav';
import Image from 'next/image';
import styles from './page.module.css';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function Hauna() {
    const router = useSearchParams();
    const id = router.get('id');

    return (
        <Suspense>
            <Navigation id={id} />
            <main>
                <HaunaHero />
                <HaunaAbout />
            </main>
            <footer className={styles.footer}>
                <Image
                    src='/logo.png'
                    width={136}
                    height={80}
                    className={styles.navigation_logo}
                    style={{ width: 'auto', height: 'auto' }}
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 544px'
                    alt='Logo'
                />
                <p>All rights reserved.</p>
            </footer>
        </Suspense>
    );
}
