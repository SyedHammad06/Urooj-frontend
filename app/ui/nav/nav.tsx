import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './nav.module.css';

export default function Navigation({ id }: { id: string | null }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav className={styles.navigation}>
                <Link href='/'>
                    <Image
                        src='/logo.png'
                        width={136}
                        height={80}
                        className={styles.navigation_logo}
                        style={{ width: 'auto', height: 'auto' }}
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 544px'
                        alt='Logo'
                    />
                </Link>
                <button
                    className={styles.hamburger}
                    onClick={toggleMenu}
                    aria-label='Toggle navigation menu'
                >
                    ☰
                </button>
                <ul
                    className={`${styles.navigation_list} ${
                        menuOpen ? styles.navigation_list_open : ''
                    }`}
                >
                    <li className={styles.navigation_list_item}>
                        <Link href={id ? `/?id=${id}` : '/'}>Home</Link>
                    </li>
                    <li className={styles.navigation_list_item}>
                        <Link href={id ? `/about?id=${id}` : '/about'}>
                            About
                        </Link>
                    </li>
                    <li className={styles.navigation_list_item}>
                        <Link href={id ? `/products?id=${id}` : '/products'}>
                            Products
                        </Link>
                    </li>
                    <li className={styles.navigation_list_item}>
                        <Link href={id ? `/hauna?id=${id}` : '/hauna'}>
                            Hauna
                        </Link>
                    </li>
                    <li className={styles.navigation_list_item}>
                        <Link href={id ? `/contact?id=${id}` : '/contact'}>
                            Contact
                        </Link>
                    </li>
                </ul>
                <div className={styles.navigation_action}>
                    <Link href='#'>
                        <Image
                            src='/whatsapp.svg'
                            width={20}
                            height={20}
                            alt='whatsapp icon'
                            className={styles.navigation_action_svg}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100px'
                        />
                    </Link>
                    <span className={styles.navigation_action_divider}></span>
                    <Link href={id ? `/dashboard?id=${id}` : '/login'}>
                        <Image
                            src='/user.svg'
                            width={20}
                            height={20}
                            alt='login user icon'
                            className={styles.navigation_action_svg}
                            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100px'
                        />
                    </Link>
                </div>
            </nav>
        </>
    );
}
