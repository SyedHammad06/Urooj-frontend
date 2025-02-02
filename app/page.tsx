'use client';

import About from './ui/about/about';
import Hero from './ui/hero/hero';
import Navigation from './ui/nav/nav';
import styles from './page.module.css';
import Contact from './contact/page';
import { useSearchParams } from 'next/navigation';
import Footer from './ui/footer/footer';
import { Suspense } from 'react';

export default function Home() {
    const query = useSearchParams();
    const id = query.get('id');

    return (
        <>
            <Suspense>
                <Navigation id={id} />
                <main>
                    <Hero />
                    <About />
                    <div className={styles.stats}>
                        <div>
                            <h3>03</h3>
                            <p>Program Objectives</p>
                        </div>
                        <div>
                            <h3>04</h3>
                            <p>Program Outcomes</p>
                        </div>
                        <div>
                            <h3>05</h3>
                            <p>Curriculum Framework</p>
                        </div>
                    </div>
                    <Contact />
                </main>
                <Footer />
            </Suspense>
        </>
    );
}
