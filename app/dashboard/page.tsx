'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { FormEvent, Suspense, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './page.module.css';
import Link from 'next/link';

interface UserDetails {
    [key: string]: string;
    fName: string;
    mName: string;
    lName: string;
    personalEmail: string;
    adhaar: string;
    userAddress: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

export default function Dashboard() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const id = searchParams.get('id');
    const [username, setUserName] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const originalPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const response = await axios.get(
                        'http://147.93.102.224:5000/api/Urooj/Verify',
                        {
                            headers: {
                                Authorization: `Bearer ${id}`,
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (response.data.userName) {
                        setUserName(response.data.userName);
                        getUserDetails(response.data.userName);
                    }
                } catch (error) {
                    console.log(error);
                }
            })();
        } else {
            router.replace('/');
        }
    }, [id, router, username]);

    const getUserDetails = async (username: string) => {
        try {
            const response = await axios.get(
                `http://147.93.102.224:5000/api/Urooj/UserDetails/${username}`
            );
            const renamedColumns: UserDetails = {
                fName: 'Full_Name',
                mName: 'Middle_Name',
                lName: 'Last_Name',
                personalEmail: 'Email',
                adhaar: 'Adhaar',
                userAddress: 'Address',
                city: 'City',
                state: 'State',
                zip: 'Zip',
                country: 'Country',
            };
            const finalData = Object.keys(response.data).reduce(
                (acc: { [key: string]: unknown }, key) => {
                    const newKey = renamedColumns[key] || key;
                    acc[newKey] = response.data[key];
                    return acc;
                },
                {}
            );
            setUserDetails(finalData);
        } catch (error) {
            console.log(error);
        }
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (
            newPasswordRef.current &&
            confirmPasswordRef.current &&
            originalPasswordRef.current
        ) {
            if (
                newPasswordRef.current.value ===
                confirmPasswordRef.current.value
            ) {
                const body = {
                    userName: username,
                    newPassword: newPasswordRef.current.value,
                    oldPassword: originalPasswordRef.current.value,
                };
                console.log(body);
                try {
                    const res = await fetch(
                        'http://147.93.102.224:5000/api/Urooj/ChangePassword',
                        {
                            method: 'POST',
                            body: JSON.stringify(body),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    if (res.ok) {
                        alert('Password Changed Successfully');
                    } else {
                        alert('Password incorrect');
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <div className={styles.dashboard}>
                <div className={styles.dashboard_flex}>
                    <h2>User Details</h2>
                    <Link href='/login'>Sign Out</Link>
                </div>
                <div className={styles.dashboard_info_grid}>
                    {Object.entries(userDetails).map(([key, value], i) => {
                        if (key !== 'photo' && key !== 'isAdmin') {
                            return (
                                <div key={i}>
                                    <h3>{key}</h3>
                                    <p>
                                        {JSON.stringify(value).replace(
                                            /"/g,
                                            ''
                                        )}
                                    </p>
                                </div>
                            );
                        }
                    })}
                </div>
                <h2>Change Password</h2>
                <div className={styles.dashboard_input}>
                    <form className={styles.custom_form} onSubmit={onSubmit}>
                        <div className={styles.form_field}>
                            <label htmlFor='originalPassword'>
                                Original Password
                            </label>
                            <input
                                type='text'
                                id='originalPassword'
                                ref={originalPasswordRef}
                            />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor='newPassword'>New Password</label>
                            <input
                                type='password'
                                id='newPassword'
                                minLength={6}
                                ref={newPasswordRef}
                            />
                        </div>
                        <div className={styles.form_field}>
                            <label htmlFor='confirmPassword'>
                                Confirm Password
                            </label>
                            <input
                                type='text'
                                id='confirmPassword'
                                ref={confirmPasswordRef}
                            />
                        </div>
                        <button type='submit' className={styles.submit_button}>
                            Update Password
                        </button>
                    </form>
                </div>
            </div>
        </Suspense>
    );
}
