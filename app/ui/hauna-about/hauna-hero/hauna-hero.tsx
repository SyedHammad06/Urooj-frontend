import Image from 'next/image';
import styles from './hauna-hero.module.css';
import Link from 'next/link';

export default function Hero() {
    return (
        <div className={styles.hero}>
            <picture>
                <source media='(max-width: 640px)' srcSet='/hauna-phone.jpg' />
                <source
                    media='(min-width: 641px)'
                    srcSet='/hauna-desktop.jpg'
                />
                <Image
                    src='/hauna-desktop.jpg'
                    width={1600}
                    height={900}
                    alt='Home Backdrop'
                    className={styles.hero_image}
                />
            </picture>
            <div className={styles.hero_image_fadeout}></div>
            <div className={styles.hero_content}>
                <h1>Introducing Hauna - A Syllabus for the Pre-schools!</h1>
                <p>
                    Early childhood education is the cornerstone of a
                    child&apos;s future academic and social success. The Hauna
                    syllabus is designed to redefine learning by emphasizing
                    innovative teaching practices, nurturing environments, and
                    holistic development. Whether you are creating a new school
                    or enhancing your current curriculum, here&apos;s how Hauna
                    can revolutionize early education.
                </p>
                <Link href='https://hauna.co.in/' target='_blank'>
                    Know More &rarr;
                </Link>
            </div>
        </div>
    );
}
