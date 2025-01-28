'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (usernameRef.current && passwordRef.current) {
            const body = {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
            };

            try {
                const res = await fetch(
                    'https://localhost:7102/api/Urooj/Login',
                    {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (!res.ok) {
                    const errorData = await res.json();
                    if (errorData.message) {
                        alert(errorData.message);
                    } else {
                        alert('An error occurred. Please try again.');
                    }
                    return;
                }

                const data = await res.json();
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    router.push(`/dashboard?id=${data.token}`);
                }
            } catch (error) {
                alert('An unexpected error occurred. Please try again.');
                console.error(error);
            }
        }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login}>
                <Image
                    src='/logo.png'
                    width={136}
                    height={80}
                    className={styles.login_logo}
                    style={{ width: 'auto', height: 'auto' }}
                    alt='Logo'
                />
                <div className={styles.login_navigation}>
                    <Link href='/'>
                        <Image
                            src='/back.svg'
                            width={19}
                            height={16}
                            className={styles.login_logo}
                            alt='Back Icon'
                        />
                        <p>Go Back</p>
                    </Link>
                </div>
                <h1>Login</h1>
                <form className={styles.custom_form} onSubmit={onSubmit}>
                    <div className={styles.form_field}>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' ref={usernameRef} />
                    </div>
                    <div className={styles.form_field}>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            ref={passwordRef}
                            minLength={6}
                        />
                    </div>
                    <button type='submit' className={styles.submit_button}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
