import styles from './footer.module.css';
import Image from 'next/image';

export default function Footer() {
    return (
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
    );
}
