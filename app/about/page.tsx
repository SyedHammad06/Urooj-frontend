'use client';

import { useSearchParams } from 'next/navigation';
import Footer from '../ui/footer/footer';
import Navigation from '../ui/nav/nav';
import styles from './page.module.css';
import Image from 'next/image';
import { Suspense } from 'react';

export default function About() {
    const query = useSearchParams();
    const id = query.get('id');

    return (
        <Suspense>
            <Navigation id={id} />
            <div className={styles.about} id='#about'>
                <div className={styles.about_left}>
                    <h2>About Urooj</h2>
                    <p>
                        At Urooj, we are on a mission to transform early
                        childhood education through pioneering syllabus design
                        and exceptional educational products. Our passion lies
                        in nurturing the youngest learners with a holistic
                        approach to learning, offering the revolutionary Hauna
                        curriculum for H1 (Nursery), H2 (LKG), and H3 (UKG).
                        <br />
                        <br />
                        Beyond the curriculum, we take pride in providing a
                        curated range of books, stationery, and learning
                        materials to enrich the classroom experience for both
                        students and educators.
                    </p>
                    <h3>Our Mission</h3>
                    <p>
                        &quot;Empowering educators and inspiring young learners
                        through dynamic, modern, and comprehensive educational
                        solutions.&quot;
                        <br />
                        <br />
                        At Urooj, we&quot;re committed to building a brighter
                        future for the leaders of tomorrow by ensuring they
                        receive the highest quality of education today.
                    </p>
                </div>
                <div className={styles.about_right}>
                    <Image
                        src='/pic-1.jpg'
                        alt='about display image'
                        width={500}
                        height={500}
                        style={{ width: 'auto', height: 'auto' }}
                        sizes='(max-width: 640px) 50vw, (max-width: 768px) 40vw, (max-width: 1200px) 500px'
                        className={styles.about_right_img}
                    />
                </div>
            </div>
            <Footer />
        </Suspense>
    );
}
