import Image from 'next/image';
import Link from 'next/link';
import styles from './hero.module.css';

export default function Hero() {
    return (
        <div className={styles.hero}>
            <picture>
                <source media='(max-width: 640px)' srcSet='/hero-phone.jpg' />
                <source media='(min-width: 641px)' srcSet='/hero-desktop.jpg' />
                <Image
                    src='/hero-desktop.jpg'
                    width={1600}
                    height={900}
                    alt='Home Backdrop'
                    className={styles.hero_image}
                />
            </picture>
            <div className={styles.hero_image_fadeout}></div>
            <div className={styles.hero_content}>
                <h1>
                    Empowering Minds with a New Approach: Explore Our Hauna
                    Curriculum
                </h1>
                <p>
                    Discover a world of endless possibilities with Hauna, a
                    thoughtfully crafted curriculum designed to ignite curiosity
                    and nurture young minds during their foundational years.
                    Built specifically for kindergarten students, Hauna blends
                    play-based learning with essential foundational skills to
                    set children on an exciting journey of joyful discovery.
                </p>
                <Link href='/hauna'>Know More &rarr;</Link>
            </div>
        </div>
    );
}
